<template>
  <el-cascader
    ref="cascaderRef" 
    class="form-items-achieve" 
    v-bind="$attrs" 
    v-model="controlEvents.getValue.value" 
    :placeholder="$attrs.placeholder || '请选择'" 
    :options="props.renders.options"
   >
      <!-- cascader 比较特殊, 只提供默认插槽[官方文档也目前也只有一个插槽] -->
      <template v-if="controlEvents.judgeCascaderSlotsList(props.slotsListTransform.slotPropsList) !== -1" #default="{node, data}">
        <slot :name="props.slotsListTransform.slotRenamedList[controlEvents.judgeCascaderSlotsList(props.slotsListTransform.slotPropsList)]" :pop="{node, data}"></slot>
      </template>
  </el-cascader>
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
  }),
  judgeCascaderSlotsList: (slotsList: any): number => {
    const hasDefaultSlots: number = slotsList.indexOf('default')
    if (slotsList.length > 1 && !hasDefaultSlots) console.error('cascader components only supports default slots') 
    return hasDefaultSlots
  }
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

const cascaderRef = ref(null)

defineExpose({
  refTarget: cascaderRef, // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>

</style>