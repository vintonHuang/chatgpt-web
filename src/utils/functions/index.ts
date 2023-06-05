/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import { baseUrlApi } from '@/config'
export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}
// 通过配置获取不同的baseUrl
export function getBaseUrl(url: string) {
  let baseUrl
  Object.keys(baseUrlApi).forEach((key) => {
    if (baseUrlApi[key as keyof typeof baseUrlApi].includes(url))
      baseUrl = key
  })
  return baseUrl
}
