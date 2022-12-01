<template>
<div class="fat" @click="onclick">
  fat: {{ $attrs }}
<son v-bind="$attrs"/>
<hr>
</div>

</template>

<script lang="ts" setup>
import son from './son.vue'
defineProps({
  fat: null
})
const onclick = () => {
  console.log('on click from: fat.vue');
}
</script>

<style lang="scss" scoped>

</style>