import { get } from '@/utils/request'

export function getSMScode<T>(phone: string) {
  return get<T>({
    url: '/user/sms_code',
    data: { phone },
  })
}
