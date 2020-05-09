import http from 'http'
import proxy from 'http-proxy'
import { getConfig } from '../utils/getConfig'
import { connectUrl } from '../utils/tools'

const proxyServer = proxy.createProxyServer()


export function relay(message: http.IncomingMessage, response: http.ServerResponse) {
  const config = getConfig()
  const target = connectUrl(config.targetUrl, message.url!)
  
  proxyServer.web(message, response, {
    target,
    secure: false,
    changeOrigin: true
  })
}