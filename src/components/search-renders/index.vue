<template>
  <form-renders
    v-if="props.renders" 
    ref="searchFormRef" 
    :renders="props.renders.renders" 
    v-model="searchFormsEvents.forms"
    :passivity="props.renders.passivity"
  >
    <template 
      #footer 
      v-if="
        props.renders.opertaionPosition === 'bottom' || 
        props.renders.opertaionPosition === 'bottom-left' || 
        props.renders.opertaionPosition === 'bottom-right' || 
        props.renders.opertaionPosition === 'bottom-center'
      "
    >
      <slot v-if="slots['bottom']" name="bottom"></slot>
      <div v-else class="type-is-bottom" :class="props.renders.opertaionPosition">
        <el-button @click="buttonsEvents.reset">{{ props.renders.submitText || '重置' }}</el-button>
        <el-button type="primary" @click="buttonsEvents.submit">{{ props.renders.submitText || '查询' }}</el-button>
      </div>
    </template>
    <template #right v-else>
      <slot v-if="slots['right']" name="right"></slot>
      <div v-else style="padding-left: 20px">
        <el-button @click="buttonsEvents.reset">{{ props.renders.resetText || '重置' }}</el-button>
        <el-button type="primary" @click="buttonsEvents.submit">{{ props.renders.submitText || '查询' }}</el-button>
      </div>
    </template>
  </form-renders>
  <div v-else style="color: red">could not get renders in your props.renders</div>
</template>
<script lang="ts" setup>
import FormRenders from '../form-renders/index.vue'
const props = defineProps({
  modelValue: Object,
  passivity: Boolean,
  renders: {
    type: Object,
    required: true
  }
})

const { slots } = getCurrentInstance()
const searchFormsEvents = reactive({
  forms: reactive({})
})

const searchFormRef = ref()

const buttonsEvents = {
  submit: () => {
    if (searchFormRef) return searchFormRef.value.getFormsValue()
  },
  reset: () => {
    searchFormRef.value.resetFields()
  }
}

const install = () => {
  //  props.passivity: 被动状态
  // 判断是否为被动状态: 被动状态决定 form-render 内部 forms 是否被暴露，并决定 props 中的 forms 是否有效
  if (!props.renders?.passivity && props.modelValue) {
    console.error('error from search renders, props modelValue[v-model] only available when props passivity is true')
  } else if (props.renders.passivity && props.modelValue) {
    // console.info('passivity mode open')
    searchFormsEvents.forms = props.modelValue
  }
}

install()

defineExpose({
  getFormsRef: () => {
    if (searchFormRef.value) return searchFormRef.value
    else {
      console.error('could not found target ref')
      return {}
    }
  },
  getFormsValue: () => {
    if (props.renders.passivity) return JSON.parse(JSON.stringify(searchFormsEvents.forms))
    else if (searchFormRef.value) return searchFormRef.value.getFormsValue()
    else {
      console.error('error in search-renders, could not get forms value')
      return {}
    }
  }
})
console.log(searchFormRef)

</script>
<style lang="scss" scoped>
.type-is-bottom {
  width: 100%;
}
.bottom-center {
  text-align: center;
}
.bottom,
.bottom-right {
  text-align: right;
}

.bottom-left {
  text-align: left;
}

</style>