<template>
  <div>{{ getData }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: null,
    default: null,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})
const getData = computed(() => {
  if (props.item.options && Array.isArray(props.item.options)) {
    const Index = props.item.options.findIndex(
      (item: any) => item.value == props.data
    )
    if (Index !== -1) return props.item.options[Index]['label']
  }
  return `${props.data}`
})
</script>

<style lang="scss" scoped></style>
