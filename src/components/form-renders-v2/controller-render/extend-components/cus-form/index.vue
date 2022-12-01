<template>
  <div class="cus-form">
    <form-render 
      v-model="getModelValue" 
      :renders="props.renders" 
      :render-level="props.renderLevel + 1"
      :prop="props.prop"
    ></form-render>
  </div>
</template>

<script lang="ts" setup>
import FormRender from '../../../index.vue'
const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  renders: {
    type: null,
    default: null
  },
  renderLevel: {
    type: Number,
    default: 1
  },
  prop: {
    type: String,
    default: ""
  }
})
const emits = defineEmits(['update:modelValue'])
const getModelValue = computed({
  get: () => {
    if (props.modelValue && typeof props.modelValue === 'object') {
      return props.modelValue
    } else {
      emits('update:modelValue', {})
      return reactive({})
    }
  },
  set: (value: any) => {
    emits('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>

</style>