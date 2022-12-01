<template>
  <form-item-container v-model="getModelValue" style="width: 100%" :item="item">
    <template v-for="slotsItem in useRenderSlots(item)" #[slotsItem.slotName]>
      <slot :name="slotsItem['slotName']"></slot>
    </template>
  </form-item-container>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { useRenderSlots } from '../use-form-builder'
import FormItemContainer from './item-container/index.vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  forms: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: null,
    default: null,
  },
})
const getModelValue = useVModel(props, 'modelValue', emits)
</script>
<style lang="scss" scoped></style>
<!-- <i18n lang="yaml"></i18n> -->
