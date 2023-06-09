import { get, post } from '@/utils/request'
export interface ILoginParams {
  phone: string
  sms: string
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
