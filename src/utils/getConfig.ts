export interface RobotWaiterConfig {
  port?: number
  targetUrl: string
  wait?: number

  filters?: {
    paths?: (string | RegExp)[]
    userAgent?: string[]
  }
}

const defaultConfig: RobotWaiterConfig = {
  port: 9010,
  targetUrl: '',
  wait: 3000,

  filters: {
    paths: [],
    userAgent: [
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
  }
}

export function setConfig(config: RobotWaiterConfig) {
  const finalConfig: any = defaultConfig

  function traverse(userConfig: object, operatedConfig: object) {
    for (let key in defaultConfig) {
      const userConfigItem: any = userConfig[key as keyof typeof userConfig]!
      if (userConfigItem === undefined) { continue }

      if (userConfigItem.constructor === Object) {
        traverse(userConfigItem, operatedConfig[key as keyof typeof operatedConfig])
      } else {
        operatedConfig[key as keyof typeof operatedConfig] = userConfig[key as keyof typeof userConfig]
      }
    }
  }

  traverse(config, finalConfig)
}

export function getConfig(): RobotWaiterConfig {
  return defaultConfig
}