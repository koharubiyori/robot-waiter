import http from 'http'
import puppeteer from 'puppeteer'
import { getConfig } from '../utils/getConfig'
import { connectUrl } from '../utils/tools'

const browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox']
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