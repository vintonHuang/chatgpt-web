import { ss } from '@/utils/storage'

const LOCAL_NAME = 'promptStore'
export interface CategoryItem {
  scene_id: number
  scene_name: string
}
export type PromptList = { key: string; value: string }[]
export type CategoryList = Array<CategoryItem>
export interface PromptStore {
  promptList: PromptList
  CategoryList: CategoryList
  cacheCategoryList: Record<string, PromptList>
  selectIndex: number
}
export interface sceneItem {
  scene_id: number
  title: string
  question: string
}

export function getLocalPromptList(): PromptStore {
  const promptStore: PromptStore | undefined = ss.get(LOCAL_NAME)
  return promptStore ?? { promptList: [], CategoryList: [], cacheCategoryList: {}, selectIndex: 1 }
}

export function setLocalPromptList(promptStore: PromptStore): void {
  ss.set(LOCAL_NAME, promptStore)
}
