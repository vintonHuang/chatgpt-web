<!--
 * @Author: Vinton
 * @Date: 2023-06-07 10:52:59
 * @Description: file content
-->
<script setup lang='ts'>
import { NModal } from 'naive-ui'
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
</script>

<template>
  <NModal v-model:show="show" style="width: 90%; max-width: 640px" preset="card">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      联系我们
    </div>
  </NModal>
</template>

<style scoped lang='less'></style>
