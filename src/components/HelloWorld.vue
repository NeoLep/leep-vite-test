<script setup lang="ts">
import { setModelValue, useVModel } from "./form-item.utils"
const props = defineProps({
  ...setModelValue()
})
const getModelValue = useVModel(props)
</script>

<template>
  <el-input v-model="getModelValue"></el-input>
</template>

<style scoped>
</style>
