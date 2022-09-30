<template>
  <el-radio-group
    ref="radioGroupRef" 
    class="form-items-achieve" 
    v-model="controlEvents.getValue.value"  
    v-bind="$attrs"  
    :placeholder="$attrs.placeholder || '请选择'"
    >
    <el-radio v-for="item in props.renders.options" v-bind="item" :label="item.value">
      <template v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList" #[slotsItem]>
        <slot :name="props.slotsListTransform.slotRenamedList[index]" :pop="item"></slot>
      </template>
      <div v-if="props.slotsListTransform.slotPropsList.length === 0">
        {{item.label}}
      </div>
    </el-radio>
  </el-radio-group>
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
    set: (value: any) => {
      itemsCompositions.store.oldValue = props.modelValue
      emit('update:modelValue', value)
    }
  })
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

const radioGroupRef = ref(null)
defineExpose({
  refTarget: radioGroupRef,  // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>

</style>