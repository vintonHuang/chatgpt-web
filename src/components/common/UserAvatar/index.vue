<!--
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
-->
<script setup lang='ts'>
import { computed } from 'vue'
import { NAvatar, NBadge } from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const label = computed(() => {
  return userStore.userInfo.role === 'vip' ? userStore.userInfo.role : ''
})
</script>

<template>
  <div class="flex items-center">
    <div class="w-10 h-10 rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NBadge :value="label">
          <NAvatar
            size="large"
            round
            :src="userInfo.avatar"
            :fallback-src="defaultAvatar"
          />
        </NBadge>
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-5">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        {{ userInfo.name ?? 'AI chatBot' }}
      </h2>
      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <span
          v-if="isString(userInfo.description) && userInfo.description !== ''"
          v-html="userInfo.description"
        />
      </p>
    </div>
  </div>
</template>
