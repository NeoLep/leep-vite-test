<template>
  <div class="form-items-achieve">
    <el-input-number
      ref="inputNumberRef"
      class="input-number" 
      v-bind="$attrs" 
      v-model="controlEvents.getValue.value"
      :placeholder="$attrs.placeholder || '请输入'"
    >
      <template v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList" #[slotsItem]>
        <slot :name="props.slotsListTransform.slotRenamedList[index]"></slot>
      </template>
    </el-input-number>
  </div>
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

const inputNumberRef = ref(null)
defineExpose({
  refTarget: inputNumberRef,  // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

</script>
<style lang="scss" scoped>
.form-items-achieve {
   // 解决input-number时加减按钮上下边框消失的问题
  .input-number {
    width: 100%;
    :deep(.el-input-number__decrease),
    :deep(.el-input-number__increase) {
      height: calc(100% - 3px);
      top: 2px;
    }
  }

  :deep(.el-input-number.el-input-number--large.is-controls-right.input-number) {
    .el-input-number__decrease,
    .el-input-number__increase {
      height: calc(50% - 1px);
    }

    .el-input-number__increase {
      top: 2px;
    }

    .el-input-number__decrease {
      bottom: 1px;
    }
  }
}
</style> 