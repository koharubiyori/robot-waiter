import http from 'http'
import puppeteer from 'puppeteer'
import { getConfig } from '../utils/getConfig'
import { connectUrl } from '../utils/tools'
import process from 'process'

const browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox']
})

async function closeBrowser() {
  const browser = await browserPromise
  return browser.close()
}

// 监听事件关闭无头浏览器，如果不关闭将导致留下一个浏览器进程
process.on('uncaughtException', closeBrowser) // 监听错误
process.on('SIGINT', closeBrowser)  // 监听快捷键退出
process.on('SIGTERM', async () => {  // 监听外部发出退出信号
  await closeBrowser()
  process.exit()  // 添加SIGTERM监听器后会导致默认的退出行为失效，这里需要手动退出进程
})

export async function render(message: http.IncomingMessage, response: http.ServerResponse) {
  const config = getConfig()
  const browser = await browserPromise
  
  const page = await browser.newPage()
  
  const url = connectUrl(config.targetUrl, message.url!)
  await page.goto(url)

  setTimeout(async () => {
    const content = await page.content()
    response.writeHead(200)
    response.write(content)
    response.end()
    page.close()
  }, config.wait)
}