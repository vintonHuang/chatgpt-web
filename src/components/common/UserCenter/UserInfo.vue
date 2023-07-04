<!--
 * @Author: Vinton
 * @Date: 2023-06-20 11:44:33
 * @Description: file content
-->
<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
import { ref } from 'vue'
import BindPhone from '../BindPhone/index.vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const showBindPhone = ref(false)
const handleBindPhone = () => {
  showBindPhone.value = true
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="flex items-center space-x-4">
      <span class="flex-shrink-0 w-[100px]">用户名称:</span>
      <span class="flex-shrink-0 w-[100px]">{{ userStore.userInfo.user_name }}</span>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-shrink-0 w-[100px]">电话:</span>
      <div class="flex-1">
        <NInput v-model:value="userStore.userInfo.phone" :disabled="true" placeholder="请绑定手机号码" />
      </div>
      <NButton size="tiny" text type="primary" :disabled="userStore.userInfo.is_bind_phone" @click="handleBindPhone">
        绑定手机
      </NButton>
    </div>
    <div class="flex items-center space-x-4">
      <span class="flex-shrink-0">账户vip有效时间:</span>
      <span class="flex-shrink-0">{{ userStore.userInfo.expire_time }}</span>
    </div>
  </div>
  <BindPhone v-model:visible="showBindPhone" />
</template>

<style scoped lang="less"></style>
