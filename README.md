## 简介

该模块可以使SPA在不使用服务端渲染的情况下，使搜索引擎在爬取应用时，返回页面js执行过的结果，而在用户访问应用时，直接返回原始页面，以此来改善SPA的SEO。

你可以把这个模块当做node.js版本的[rendora](https://github.com/rendora/rendora)，原理也是相同的。

## 安装

```
yarn add robot-waiter
npm i robot-waiter
```

robot-waiter中使用了[Puppeteer](https://pptr.dev/)，在安装时会同时安装和Puppeteer配套使用的Chromium (~170MB Mac, ~282MB Linux, ~280MB Win)，详情以及如何使用自定义浏览器渲染，请参考Puppeteer官网首页的Installation章节。

因为安装Puppeteer时会下载Chromium，请耐心等待(尤其是国内，速度会相对较慢)。

一些Linux的OS可能会缺少部分依赖库，运行时会报错，请根据错误提示安装对应的依赖库文件。

## 例子
``` js
import robotWaiter from 'robot-waiter'

robotWaiter({
  port: 8001    // robot-waiter服务端口
  targetUrl: 'localhost://8080'   // 要代理的url
})
```

## 参数
``` ts
interface RobotWaiterConfig {
  port?: number
  targetUrl: string
  wait?: number

  filters?: {
    paths?: (string | RegExp)[]
    userAgent?: string[]
  }
}
```

- **port**: robot-waiter的服务端口。默认值：9010
- **targetUrl**: 要代理的url，如果要代理的应用部署在同一台服务器上，应该使用本地url而不是网络url，以免造成额外的性能损失。
- **wait**: 页面从加载开始要等待的时间，单位为毫秒。默认值：3000
- **filters**: 过滤选项。
    - paths: 由字符串或正则表达式组成的数组，与这些字符串或正则匹配的路径(不包括baseUrl，baseUrl一般等同于传入的targetUrl)，将由robot-waiter返回处理结果。默认值：[]。
    - userAgent: 由字符串组成的数组，接收到的请求头user-agent字段中包含这些字符串其中之一的，由robot-waiter返回处理结果。默认值：[
      'bot', 
      'bing',
      'yandex',
      'slurp',
      'duckduckgo',
      'baiduspider',
      'googlebot',
      '360spider',
      'sosospider',
      'sogou spider'
    ]