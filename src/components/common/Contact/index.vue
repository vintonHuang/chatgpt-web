<!--
 * @Author: Vinton
 * @Date: 2023-06-07 10:52:59
 * @Description: file content
-->
<script setup lang='ts'>
import { NImage, NModal } from 'naive-ui'
import { computed } from 'vue'
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
function getImageUrl(name: string) {
  return new URL(`../../../assets/${name}`, import.meta.url).href
}
</script>

<template>
  <NModal v-model:show="show" style="max-width: 350px" title="联系我们" preset="card">
    <div class=" bg-white rounded dark:bg-slate-800">
      <p>扫码添加在线客服，如有任何使用疑问，遇到什么问题可以客服沟通，我们会及时处理</p>
      <NImage
        width="200"
        :src="getImageUrl('wechat.jpg')"
      />
    </div>
  </NModal>
</template>

<style scoped lang='less'></style>
