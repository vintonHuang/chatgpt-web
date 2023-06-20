<!--
 * @Author: Vinton
 * @Date: 2023-06-05 14:41:46
 * @Description: file content
-->
<script setup lang='ts'>
import { computed, ref, unref } from 'vue'
import type { CountdownInst, CountdownProps } from 'naive-ui'
import { NButton, NCountdown, NIcon, NInput, NModal, NTabPane, NTabs, useMessage } from 'naive-ui'
import { BarcodeOutline, PeopleOutline, PhonePortraitOutline, ReturnUpForwardOutline, Rocket } from '@vicons/ionicons5'
import { getSMScode, login } from '@/api/user'
import { useAuthStore, usePromptStore, useUserStore } from '@/store'
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
const disabledSMS = computed(() => !phoneNum.value.trim() || loading.value || !code.value.trim())

async function handlePhoneVerify() {
  if (!isPhoneNumber(phoneNum.value)) {
    ms.error('请输入正确格式的手机号码')
    return
  }
  try {
    loading.value = true
    const { data } = await login<{ expire: string; token: string }>({
      type: 'sms',
      phone: unref(phoneNum),
      sms: unref(code),
    })
    authStore.setToken(data.token)
    ms.success('登录成功')
    // 获取用户信息
    useUserStore().getUserInfo()
    usePromptStore().getCategoryScene()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
  }
  finally {
    loading.value = false
  }
}
const userName = ref('')
const password = ref('')
const disabledUserLogin = computed(() => !userName.value.trim() || loading.value || !password.value.trim())
async function handleUserPasswordVerify() {
  try {
    loading.value = true
    const { data } = await login<{ expire: string; token: string }>({
      type: 'upt',
      username: unref(userName),
      password: unref(password),
    })
    authStore.setToken(data.token)
    ms.success('登录成功')
    // 获取用户信息
    useUserStore().getUserInfo()
    usePromptStore().getCategoryScene()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
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
    await getSMScode(phoneNum.value)
    ms.success('验证码发送成功')
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
            welcome to AI🤖️ world👏👏👏
          </h2>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <NTabs type="line" animated>
          <NTabPane name="userPassword" tab="账号密码">
            <NInput v-model:value="userName" placeholder="用户名">
              <template #prefix>
                <NIcon :component="PeopleOutline" />
              </template>
            </NInput>
            <NInput v-model:value="password" class="mt-3 mb-3" placeholder="密码">
              <template #prefix>
                <NIcon :component="BarcodeOutline" />
              </template>
            </NInput>
            <NButton block type="primary" :disabled="disabledUserLogin" :loading="loading" @click="handleUserPasswordVerify">
              账号密码登录
            </NButton>
          </NTabPane>
          <NTabPane name="sms" tab="手机验证码">
            <NInput v-model:value="phoneNum" placeholder="账号（输入手机号码）" :allow-input="onlyAllowNumber">
              <template #prefix>
                <NIcon :component="PhonePortraitOutline" />
              </template>
            </NInput>
            <div class="flex mt-3 mb-3">
              <NInput v-model:value="code" :allow-input="onlyAllowNumber" class="flex-1" placeholder="验证码（点击获取验证码)">
                <template #prefix>
                  <NIcon :component="Rocket" />
                </template>
                <template #suffix>
                  <NIcon :component="ReturnUpForwardOutline" />
                </template>
              </NInput>
              <NButton color="#8a2be2" style="margin-left:10px" :disabled="active" @click="handleSendSms">
                <NCountdown v-if="active" ref="countdown" :duration="60 * 1000" :active="active" :render="renderCountdown" :on-finish="handleFinish" />
                <span v-else>发送验证码</span>
              </NButton>
            </div>
            <NButton block type="primary" :disabled="disabledSMS" :loading="loading" @click="handlePhoneVerify">
              手机验证码登录
            </NButton>
          </NTabPane>
        </NTabs>
      </div>
      <div class="text-center">
        登录代表您已阅读并同意<a class="text-slate-400 hover:text-blue-600" href="/public/隐私政策与使用条款.docx" target="_blank">服务协议和隐私保护指引</a>
      </div>
    </div>
  </NModal>
</template>
