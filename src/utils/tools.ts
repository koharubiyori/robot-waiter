export function connectUrl(...args: string[]) {
  const url = args.reduce((prev, item) => {
    return prev.replace(/\/$/, '') + '/' + item.replace(/^\//, '')
  }, '')

  return url.substring(1).replace(/\/$/, '')
}