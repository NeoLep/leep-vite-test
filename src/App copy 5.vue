<template>
  <FormRender :renders="renders" />
</template>

<script lang="ts" setup>
import FormRender from './components/form-renders-v2/index.vue'
const renders = reactive([
  {
    label: '姓名',
    type: {
      type: 'element-plus',
      component: 'el-input' 
    },
    props: {

    },
    slots: {
      
    },
    events: {

    }
  }
])
</script>

<style lang="scss" scoped>

</style>