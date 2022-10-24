<template>
  <form-renders v-model="controlEvents.getValue" :renders="props.renders.renders" passivity
    v-bind="$attrs">
    <template v-for="(slotsItem, index) in props.slotsListTransform.slotPropsList" #[slotsItem]>
      <slot :name="props.slotsListTransform.slotRenamedList[index]" :pop="slotsItem"></slot>
    </template>
  </form-renders>
</template>

<script lang="ts" setup>
import FormRenders from '../../index.vue'
import { FormItemsCompositions, extendProps, extendEmits } from '../form-items-compositions'

const props = defineProps({
  ...extendProps
})

const emit = defineEmits([...extendEmits])

const controlEvents = {
  getValue: computed({
    get: () => {
      if (props.modelValue && props.modelValue.constructor === Object) return props.modelValue
      else return reactive({})
    },
    set: (value) => {
      itemsCompositions.store.oldValue = props.modelValue
      emit('update:modelValue', value)
    }
  })
}

const itemsCompositions = FormItemsCompositions(props, emit) // 注入props与emit

const selectRef = ref(null)
watch(
  () => controlEvents.getValue,
  () => {
    emit('update:modelValue', controlEvents.getValue)
  },
  {
  deep: true
  }
)
defineExpose({
  refTarget: selectRef,  // 当前使用的组件的实例
  getOldValue: () => itemsCompositions.store.oldValue // 历史值
})

onMounted(() => {
  const { slots } = getCurrentInstance()
})
</script>

<style lang="scss" scoped>

</style>