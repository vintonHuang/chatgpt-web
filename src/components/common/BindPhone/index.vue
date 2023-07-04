<!--
 * @Author: Vinton
 * @Date: 2023-06-05 14:41:46
 * @Description: file content
-->
<script setup lang='ts'>
import { computed, ref, unref } from 'vue'
import type { CountdownInst, CountdownProps } from 'naive-ui'
import { NButton, NCountdown, NIcon, NInput, NModal, useMessage } from 'naive-ui'
import { PhonePortraitOutline, ReturnUpForwardOutline, Rocket } from '@vicons/ionicons5'
import { getSMScode, updatePhone } from '@/api/user'
import { useUserStore } from '@/store'
import { isPhoneNumber } from '@/utils/is'
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
    await updatePhone({
      phone: unref(phoneNum),
      sms: unref(code),
    })
    ms.success('绑定成功')
    // 获取用户信息
    useUserStore().getUserInfo()
    emit('update:visible', false)
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
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
  <NModal v-model:show="show" title="绑定手机" style="width: 800px" preset="card">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
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
          绑定手机
        </NButton>
      </div>
    </div>
  </NModal>
</template>
