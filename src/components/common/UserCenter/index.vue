<!--
 * @Author: Vinton
 * @Date: 2023-06-07 10:52:59
 * @Description: file content
-->
<script setup lang='ts'>
import { NModal, NTabPane, NTabs } from 'naive-ui'
import { computed } from 'vue'
import UserInfo from './UserInfo.vue'
import { SvgIcon } from '@/components/common'
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
interface Emit {
  (e: 'update:visible', visible: boolean): void
}
interface Props {
  visible: boolean
}

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})
</script>

<template>
  <NModal v-model:show="show" style="width: 90%; max-width: 640px" title="用户中心" preset="card">
    <div class="bg-white rounded dark:bg-slate-800">
      <NTabs type="line" animated>
        <NTabPane name="userInfo" tab="个人详情">
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:file-user-line" />
            <span class="ml-2">个人详情</span>
          </template>
          <UserInfo />
        </NTabPane>
        <NTabPane name="orderInfo" tab="订单信息">
          敬请期待
          <template #tab>
            <SvgIcon class="text-lg" icon="ri:equalizer-line" />
            <span class="ml-2">订单信息</span>
          </template>
        </NTabPane>
      </NTabs>
    </div>
  </NModal>
</template>

<style scoped lang='less'></style>
