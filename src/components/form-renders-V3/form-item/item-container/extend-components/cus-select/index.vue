<template>
  <el-select
    v-model="formEvents.getModelValue"
    @visible-change="(...args: any) => formEvents.catchEvents('visible-change', ...args)"
  >
    <el-option
      v-for="(optionItem, index) in getOptions"
      :key="index"
      :label="optionItem.label"
      :value="optionItem.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
const emits = defineEmits(['update:modelValue', 'visible-change', 'onMounted'])
const props = defineProps({
  modelValue: {
    type: null,
    default: null,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})

const formEvents = reactive({
  getModelValue: useVModel(props, 'modelValue', emits),
  catchEvents: (type: 'visible-change' | 'onMounted', ...args: any) => {
    if (props.item.asyncOptions) {
      if (typeof props.item.asyncOptions === 'function') {
        props.item.asyncOptions(
          (options: any[]) => (getOptions.value = options),
          props.item
        )
      } else if (
        props.item.asyncOptions.getOptions &&
        typeof props.item.asyncOptions.getOptions === 'function'
      ) {
        const trigger = props.item.asyncOptions.trigger || [
          'onMounted',
          'visible-change',
        ]
        if (
          (Array.isArray(trigger) && !trigger.includes(type)) ||
          (typeof trigger === 'string' && trigger !== type)
        )
          return

        // --
        props.item.asyncOptions.getOptions(
          (options: any[]) => (getOptions.value = options),
          props.item,
          {
            type,
            args,
          }
        )
      }
    }
    emits(type, ...args)
  },
})

const getOptions: any = ref([])

watch(
  () => props.item.options,
  (value: any[]) => {
    getOptions.value = value
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  formEvents.catchEvents('onMounted', {
    // 手动添加一个 onMounted 钩子
    value: formEvents.getModelValue,
    item: props.item,
  })
})
</script>

<style lang="scss" scoped></style>
