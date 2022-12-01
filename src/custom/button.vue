<template>
  <input
    style="height: 30px; line-height: 30px"
    ref="inputRef"
    class="form-items-achieve el-input__wrapper" 
    v-bind="$attrs" 
    v-model="controlEvents.getValue.value" 
    placeholder="请输入内容"
    />
</template>
<script lang="ts" setup>
import { useFormItem } from 'element-plus';

const { formItem } = useFormItem();
const props = defineProps({
  modelValue: null
})

const emit = defineEmits(['update:modelValue'])

const controlEvents = {
  getValue: computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value)
      formItem?.validate('blur'); // 触发校验
    }
  })
}


const inputRef = ref(null)
defineExpose({
  refTarget: inputRef,  // 当前使用的组件的实例
})


</script>
<style lang="scss" scoped>
.form-items-achieve {
  border: none;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
  width: 100% !important;
  overflow: hidden;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #409eff inset !important;
  }
  &:hover {
    box-shadow: 0 0 0 1px #c0c4cc inset;
  }
  &::placeholder {
    color: #a8abb2;
  }
}
</style>