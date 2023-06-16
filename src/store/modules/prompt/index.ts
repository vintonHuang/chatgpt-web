/*
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
 */
import { defineStore } from 'pinia'
import type { CategoryList, PromptList, PromptStore, sceneItem } from './helper'
import { getLocalPromptList, setLocalPromptList } from './helper'
import { getSceneCategory, getSceneDetail } from '@/api'

export const usePromptStore = defineStore('prompt-store', {
  state: (): PromptStore => getLocalPromptList(),

  actions: {
    updatePromptList(promptList: PromptList) {
      this.$patch({ promptList })
      setLocalPromptList({ ...this.$state, promptList })
    },
    updateSelectIndex(index: number) {
      this.$state.selectIndex = index
      setLocalPromptList({ ...this.$state })
    },
    getPromptList() {
      return this.$state
    },
    async getCategoryScene() {
      const { data } = await getSceneCategory<CategoryList>()
      this.$state.CategoryList = data
      await this.getCategoryDetail(data[0].scene_id)
      setLocalPromptList({ ...this.$state, CategoryList: data })
    },
    async getCategoryDetail(scene_id: number) {
      // 缓存
      this.updateSelectIndex(scene_id)
      // eslint-disable-next-line no-prototype-builtins
      if (this.$state.cacheCategoryList.hasOwnProperty(scene_id)) {
        this.$state.promptList = this.$state.cacheCategoryList[scene_id]
        return
      }
      const { data } = await getSceneDetail<sceneItem[]>(scene_id)
      this.$state.promptList = data.map((item) => {
        return {
          key: item.title,
          value: item.question,
        }
      })
      if (data.length > 0)
        this.$state.cacheCategoryList[scene_id] = this.$state.promptList
      setLocalPromptList({ ...this.$state })
    },
  },
})
