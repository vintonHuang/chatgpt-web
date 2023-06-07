/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, removeLocalState, setLocalState } from './helper'
import { getUesInfo } from '@/api/user'
import { store } from '@/store'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },
    // 获取用户信息的接口
    async getUserInfo() {
      const { data } = await getUesInfo<UserInfo>()
      this.updateUserInfo(data)
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },
    removeLocalUser() {
      this.userInfo = {} as UserInfo
      removeLocalState()
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
