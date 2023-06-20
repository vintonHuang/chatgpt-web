/*
 * @Author: Vinton
 * @Date: 2023-06-09 10:06:42
 * @Description: file content
 */
import { get, post } from '@/utils/request'
export interface ILoginParams {
  type: 'sms' | 'upt'
  phone?: string
  sms?: string
  username?: string
  password?: string
}
export function getSMScode<T>(phone: string) {
  return get<T>({
    url: import.meta.env.VITE_ENVIRONMENT_ENV === 'PRO' ? '/user/sms_code' : '/user/mock_sms_code',
    data: { phone },
  })
}

export function login<T>(data: ILoginParams) {
  return post<T>({
    url: '/user/login',
    data,
  })
}

export function getUesInfo<T>() {
  return post<T>({
    url: '/user/info',
  })
}

export function logout<T>() {
  return post<T>({
    url: '/user/logout',
  })
}

export function getOrders<T>() {
  return get<T>({
    url: '/user/orders',
  })
}
// 获取当前的售卖套餐
export function getVipProducts<T>() {
  return get<T>({
    url: '/vip/products',
  })
}
