import http from 'http'
import { RobotWaiterActionName } from '../index'
import { getConfig } from '~/utils/getConfig'

export function filter(message: http.IncomingMessage): RobotWaiterActionName {
  const config = getConfig()
  let pathPatterns: (string | RegExp)[] = []
  let userAgentPatterns: string[] = []
  const url = message.url!
  const userAgent = message.headers['user-agent']!.toLowerCase()
  
  pathPatterns = config.filters!.paths || []
  userAgentPatterns = config.filters!.userAgent || []

  userAgentPatterns = userAgentPatterns.map(item => item.toLowerCase())

  const pathFilteredResult = pathPatterns.some(path => {
    if (typeof path !== 'string' && path.constructor !== RegExp) {
      throw new TypeError('The filter.paths property must be an array of strings or RegExp')
    }

    return typeof path === 'string' ? (url.indexOf(path) > -1) : path.test(url)
  })

  if (pathFilteredResult === true) return 'render'
  
  const userAgentFilteredResult = userAgentPatterns.some(userAgentKeyword => {
    if (typeof userAgentKeyword !== 'string') {
      throw new TypeError('The filter.userAgent property must be an array of strings')
    }

    return userAgent.indexOf(userAgentKeyword) > -1
  })

  if (userAgentFilteredResult === true) return 'render'
  
  return 'relay'
}