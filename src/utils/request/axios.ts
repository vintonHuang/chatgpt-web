/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'
import { getBaseUrl } from '@/utils/functions/index'
const service = axios.create()

service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    config.baseURL = getBaseUrl(config.url as string)
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
