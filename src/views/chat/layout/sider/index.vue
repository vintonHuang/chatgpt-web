<!--
 * @Author: Vinton
 * @Date: 2023-05-31 11:10:31
 * @Description: file content
-->
<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NIcon, NLayoutSider } from 'naive-ui'
import { AccessibilityOutline as AccessIcon, CallOutline as CallOutIcon, PaperPlaneOutline as PaperIcon, PeopleOutline as PeopleIcon } from '@vicons/ionicons5'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { Contact, Invitation, Payment, PromptStore, UserCenter } from '@/components/common'

const appStore = useAppStore()
const chatStore = useChatStore()
const { isMobile } = useBasicLayout()
const show = ref(false)
const showContact = ref(false)
const showPayment = ref(false)
const showUserCenter = ref(false)
const showInvite = ref(false)
const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

function handlePluginStore() {
  window.$notification?.warning({
    title: '插件商店',
    content: '插件内容正在开发中,尽情期待',
    duration: 2000,
  })
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed"
    :collapsed-width="0"
    :width="260"
    :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform"
    position="absolute"
    bordered
    :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton dashed block @click="handleAdd">
            {{ $t('chat.newChatButton') }}
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div>
          <div class="p-1 flex justify-around">
            <NButton block color="#8a2be2" @click="showContact = true">
              <template #icon>
                <NIcon>
                  <CallOutIcon />
                </NIcon>
              </template>
              联系我们
            </NButton>
          </div>
          <!-- <div class="p-1 flex justify-around">
            <NButton block color="#66CDAA" @click="showPayment = true">
              <template #icon>
                <NIcon>
                  <PayIcon />
                </NIcon>
              </template>
              购买套餐
            </NButton>
          </div> -->
          <div class="p-1 flex justify-around">
            <NButton block ghost color="#ff69b4" @click="show = true">
              <template #icon>
                <NIcon>
                  <AccessIcon />
                </NIcon>
              </template>
              AI 角色商店
            </NButton>
          </div>
          <div class="p-1 flex justify-around">
            <NButton block ghost type="warning" @click="handlePluginStore">
              <template #icon>
                <NIcon>
                  <PaperIcon />
                </NIcon>
              </template>
              插件商店
            </NButton>
          </div>
          <!-- <div class="p-1 flex justify-around">
            <NButton block ghost color="#2E8B57" @click="showInvite = true">
              <template #icon>
                <NIcon>
                  <PersonIcon />
                </NIcon>
              </template>
              邀请好友
            </NButton>
          </div> -->
          <div class="p-1 flex justify-around">
            <NButton block ghost color="#008B8B" @click="showUserCenter = true">
              <template #icon>
                <NIcon>
                  <PeopleIcon />
                </NIcon>
              </template>
              用户中心
            </NButton>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 w-full h-full bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
  <Contact v-model:visible="showContact" />
  <Payment v-model:visible="showPayment" />
  <UserCenter v-model:visible="showUserCenter" />
  <Invitation v-model:visible="showInvite" />
</template>
