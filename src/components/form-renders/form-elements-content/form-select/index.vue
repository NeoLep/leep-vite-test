<template>
  <el-select 
    ref="selectRef" 
    class="form-items-achieve" 
    v-bind="$attrs" 
    v-model="controlEvents.getValue.value" 
    :placeholder="$attrs.placeholder || '请选择'"
  >
    <el-option v-if="!props.renders.options" v-for="item in []" />
    <el-option v-else v-for="item in props.renders.options" :key="item.value" :label="item.label" :value="item.value">
      <template v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList" #[slotsItem]>
        <slot :name="props.slotsListTransform.slotRenamedList[index]" :pop="item"></slot>
      </template>
    </el-option>
  </el-select>
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

const selectRef = ref(null)
defineExpose({
  refTarget: selectRef,  // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>

</style>