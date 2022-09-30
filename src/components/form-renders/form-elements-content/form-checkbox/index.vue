<template>
  <el-checkbox-group
    ref="checkboxGroupRef"
    class="form-items-achieve"
    v-model="controlEvents.getValue.value"
    v-bind="$attrs" 
    :placeholder="$attrs.placeholder || '请选择'"
    >
    <el-checkbox v-for="item in props.renders.options" v-bind="item" :label="item.value">
      <template v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList" #[slotsItem]>
        <slot :name="props.slotsListTransform.slotRenamedList[index]" :pop="item"></slot>
      </template>
      <div v-if="props.slotsListTransform.slotPropsList.length === 0">
        {{item.label}}
      </div>
    </el-checkbox>
  </el-checkbox-group>
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

const checkboxGroupRef = ref(null)
defineExpose({
  refTarget: checkboxGroupRef, // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>

</style>