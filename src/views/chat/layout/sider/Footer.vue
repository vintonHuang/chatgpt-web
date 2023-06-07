<!--
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
-->
<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue'
import { LogOutOutline as LoginIcon } from '@vicons/ionicons5'
import { NButton, NIcon, NPopconfirm } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import { useAuthStore, useUserStore } from '@/store'
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
const authStore = useAuthStore()
const userStore = useUserStore()
const show = ref(false)
const handleLogout = () => {
  authStore.removeToken()
  userStore.removeLocalUser()
}
</script>

<template>
  <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
    <div class="flex-1 flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>

    <HoverButton @click="show = true">
      <span class="text-xl text-[#4f555e] dark:text-white">
        <SvgIcon icon="ri:settings-4-line" />
      </span>
    </HoverButton>

    <NPopconfirm placement="bottom" @positive-click="handleLogout">
      <template #trigger>
        <NButton type="tertiary">
          <template #icon>
            <NIcon>
              <LoginIcon />
            </NIcon>
          </template>
        </NButton>
      </template>
      确定要退出当前账号吗???
    </NPopconfirm>

    <Setting v-if="show" v-model:visible="show" />
  </footer>
</template>
