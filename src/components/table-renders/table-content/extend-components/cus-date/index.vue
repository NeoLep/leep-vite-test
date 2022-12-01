<template>
  <div>{{ getData }}</div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
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
  if (props.item.format && typeof props.item.format === 'string') {
    return dayjs(props.data).format(props.item.format)
  } else {
    return `${props.data}`
  }
})
</script>

<style lang="scss" scoped></style>
