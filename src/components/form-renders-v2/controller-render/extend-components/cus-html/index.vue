<template>
  <div v-html="props.html || null"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  html: {
    type: null,
    default: null
  }
})
</script>

<style lang="scss" scoped>

</style>