/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  phone: string
  role: string
  tmp_count: number
  user_name: string
  expire_time: string
  invitation_code: string
  is_bind_phone: boolean
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/Chanzhaoyu/chatgpt-web/main/src/assets/avatar.jpg',
      name: 'AI chatBot',
      description: '人工智能模型',
      phone: '',
      role: '',
      tmp_count: 0,
      user_name: '',
      expire_time: '',
      invitation_code: '',
      is_bind_phone: false,
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeLocalState(): void {
  ss.remove(LOCAL_NAME)
}
