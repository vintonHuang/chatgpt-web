<!--
 * @Author: Vinton
 * @Date: 2023-06-07 10:52:59
 * @Description: file content
-->
<script setup lang='ts'>
import { NModal } from 'naive-ui'
defineProps<Props>()
interface Props {
  visible: boolean
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      支付渠道
    </div>
  </NModal>
</template>

<style scoped lang='less'></style>
