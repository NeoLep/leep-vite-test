<template>
  <el-date-picker
    ref="datePickerRef"
    class="form-items-achieve"
    v-bind="$attrs"
    v-model="controlEvents.getValue.value"
    :placeholder="$attrs.placeholder || '请选择'"
  >
  </el-date-picker>
</template>
<script lang="ts" setup>
import { FormItemsCompositions, extendProps, extendEmits } from '../form-items-compositions'

const props = defineProps({
  ...extendProps
})

const emit = defineEmits([...extendEmits])

const controlEvents = {
  getValue: computed({
    get: () => props.modelValue,
    set: (value) => {
      itemsCompositions.store.oldValue = props.modelValue
      emit('update:modelValue', value)
    }
  })
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

const datePickerRef = ref(null)
defineExpose({
  refTarget: datePickerRef, // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>

</style>