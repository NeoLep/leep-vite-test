<template>
  <component
    ref="componentRef"
    v-bind="$attrs"
    v-model="controlEvents.getValue.value" 
    :is="markRaw(props.renders.component)"
    >
  </component>
</template>
<script lang="ts" setup>
import { markRaw } from "vue";
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
  }),
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

console.log(markRaw(markRaw(props.renders.component)))
const componentRef = ref(null)
defineExpose({
  refTarget: componentRef,  // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})


</script>
<style lang="scss" scoped>
</style>