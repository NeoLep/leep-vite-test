<template>
  <el-select
    ref="selectRef"
    v-bind="$attrs"
    v-model="controlEvents.getValue.value"
    v-loading="
      controlEvents.loading.value && controlEvents.mountedLoading.value
    "
    :remote="false"
    :loading="controlEvents.loading.value"
    class="form-items-achieve"
    :placeholder="$attrs.placeholder || '请选择'"
    @visible-change="
      (...args: any) => controlEvents.eventBus('visible-change', ...args)
    "
    @change="(...args: any) => controlEvents.eventBus('change', ...args)"
    @remove-tag="(...args: any) => controlEvents.eventBus('remove-tag', ...args)"
    @clear="(...args: any) => controlEvents.eventBus('clear', ...args)"
    @blur="(...args: any) => controlEvents.eventBus('blur', ...args)"
    @focus="(...args: any) => controlEvents.eventBus('focus', ...args)"
  >
    <el-option
      v-for="item in controlEvents.getOptions"
      :key="item.value"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.value"
    >
      <template
        v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList"
        #[slotsItem]
      >
        <slot
          :name="props.slotsListTransform.slotRenamedList[index]"
          :pop="item"
        ></slot>
      </template>
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import {
  FormItemsCompositions,
  extendProps,
  extendEmits,
} from '../form-items-compositions'

const props = defineProps({
  ...extendProps,
})

const emit = defineEmits([
  ...extendEmits,
  'visible-change',
  'change',
  'remove-tag',
  'clear',
  'blur',
  'focus',
  'mounted',
])

const controlEvents = {
  getValue: computed({
    get: () => props.modelValue,
    set: (value) => {
      itemsCompositions.store.oldValue = props.modelValue
      emit('update:modelValue', value)
    },
  }),
  getOptions: reactive([]),
  loading: ref(true), // 加载中
  mountedLoading: ref(true), // 渲染加载
  changeLoadingStatus(status: boolean) {
    controlEvents.loading.value = status
  },
  updateGetOptions(options: any) {
    console.log('updateGetOptions', options)
    controlEvents.getOptions = options
    if (controlEvents.mountedLoading.value)
      controlEvents.mountedLoading.value = false
  },
  eventBus: (eventName: string, ...args: any) => {
    if (
      (props.renders.asyncOptionsTrigger &&
        Array.isArray(props.renders.asyncOptionsTrigger) &&
        props.renders.asyncOptionsTrigger.includes(eventName) &&
        typeof props.renders.asyncOptions === 'function') ||
      (eventName === 'mounted' && !props.renders.disabledRequestMounted)
    ) {
      props.renders.asyncOptions({
        updateOptions: controlEvents.updateGetOptions,
        updateLoading: controlEvents.changeLoadingStatus,
      })
    }
    emit(eventName, ...args)
  },
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

const selectRef = ref(null)
defineExpose({
  refTarget: selectRef, // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue, // 历史值
})
onMounted(() => {
  if (props.renders.disabledRequestMounted) {
    controlEvents.mountedLoading.value = false
  }
  // mounted
  controlEvents.eventBus('mounted')
})
</script>
<style lang="scss" scoped></style>
