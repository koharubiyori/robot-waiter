import http from 'http'
import { filter } from './modules/filter'
import { relay } from './modules/relay'
import { render } from './modules/render'
import { getConfig, setConfig, RobotWaiterConfig } from './utils/getConfig'

const actions = { relay, render }

export = function startRobotWaiterServer(config: RobotWaiterConfig) {
  setConfig(config)

  const currentConfig = getConfig()
  const server = http.createServer((message, response) => actions[filter(message)](message, response))
  server.listen(currentConfig.port)
}