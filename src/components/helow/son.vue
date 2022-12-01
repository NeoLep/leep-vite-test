<template>
<div class="son" @click="onclick">
  son: {{ $attrs }}
</div>
</template>

<script lang="ts" setup>
const onclick = () => {
  console.log('on click from: son.vue');
}
</script>

<style lang="scss" scoped>

</style>