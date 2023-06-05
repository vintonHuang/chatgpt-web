<!--
 * @Author: Vinton
 * @Date: 2023-06-05 14:41:46
 * @Description: file content
-->
<script setup lang='ts'>
import { computed, ref } from 'vue'
import type { CountdownInst, CountdownProps } from 'naive-ui'
import { NButton, NCountdown, NIcon, NInput, NModal, useMessage } from 'naive-ui'
import { PhonePortraitOutline, ReturnUpForwardOutline, Rocket } from '@vicons/ionicons5'
import { fetchVerify } from '@/api'
import { getSMScode } from '@/api/user'
import { useAuthStore } from '@/store'
import Icon403 from '@/icons/403.vue'
import { isPhoneNumber } from '@/utils/is'
interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
const ms = useMessage()

const loading = ref(false)
const phoneNum = ref('')
const code = ref('')
const disabled = computed(() => !phoneNum.value.trim() || loading.value || !code.value.trim())

async function handleVerify() {
  const secretKey = phoneNum.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    await fetchVerify(secretKey)
    authStore.setToken(secretKey)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    phoneNum.value = ''
  }
  finally {
    loading.value = false
  }
}
const countdownRef = ref<CountdownInst | null>()
const active = ref(false)
async function handleSendSms() {
  if (!isPhoneNumber(phoneNum.value)) {
    ms.error('请输入正确格式的手机号码')
    return
  }
  if (!active.value) {
    active.value = true
    const { status } = await getSMScode(phoneNum.value)
    if (status === 'Success')
      ms.success('发送成功')
  }
}
// 渲染倒计时
const renderCountdown: CountdownProps['render'] = ({ minutes, seconds }) => {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
const handleFinish = () => {
  active.value = false
  countdownRef.value?.reset()
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            用户登录
          </h2>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <NInput v-model:value="phoneNum" placeholder="账号（输入手机号码）" :allow-input="onlyAllowNumber">
          <template #prefix>
            <NIcon :component="PhonePortraitOutline" />
          </template>
        </NInput>
        <div class="flex">
          <NInput v-model:value="code" :allow-input="onlyAllowNumber" class="flex-1" placeholder="验证码（点击获取验证码)">
            <template #prefix>
              <NIcon :component="Rocket" />
            </template>
            <template #suffix>
              <NIcon :component="ReturnUpForwardOutline" />
            </template>
          </NInput>
          <NButton color="#8a2be2" style="margin-left:10px" :disabled="active" @click="handleSendSms">
            <NCountdown v-if="active" ref="countdown" :duration="300 * 1000" :active="active" :render="renderCountdown" :on-finish="handleFinish" />
            <span v-else>发送验证码</span>
          </NButton>
        </div>
        <NButton block class="flex-1 ml-10" type="primary" :disabled="disabled" :loading="loading" @click="handleVerify">
          登录
        </NButton>
      </div>
    </div>
  </NModal>
</template>
