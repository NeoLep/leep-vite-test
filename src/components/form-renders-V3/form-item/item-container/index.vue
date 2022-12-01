<template>
  <div class="cus-form-item__container">
    <component
      :is="UsedComponent"
      v-model="formEvents.getModelValue"
      style="width: 100%"
      :item="props.item"
      v-bind="props.item.props || {}"
      @click="(...args: any) => formEvents.subEvents('click', ...args)"
      @input="(...args: any) => formEvents.subEvents('input', ...args)"
      @change="(...args: any) => formEvents.subEvents('change', ...args)"
      @blur="(...args: any) => formEvents.subEvents('blur', ...args)"
      @focus="(...args: any) => formEvents.subEvents('focus', ...args)"
      @clear="(...args: any) => formEvents.subEvents('clear', ...args)"
      @visible-change="(...args: any) => formEvents.subEvents('visible-change', ...args)"
      @remove-tag="(...args: any) => formEvents.subEvents('remove-tag', ...args)"
      @calendar-change="(...args: any) => formEvents.subEvents('calendar-change', ...args)"
      @panel-change="(...args: any) => formEvents.subEvents('panel-change', ...args)"
    >
      <template v-for="slotsItem in useRenderSlots(item)" #[slotsItem.key]>
        <slot :name="slotsItem['slotName']"></slot>
      </template>
    </component>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { useVModel } from '@vueuse/core'
import { useRenderSlots } from '../../use-form-builder'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: null,
    default: null,
  },
})

const formEvents = reactive({
  getModelValue: useVModel(props, 'modelValue', emits),
  subEvents: (type: string, ...args: any) => {
    if (
      props.item.events &&
      props.item.events[type] &&
      typeof props.item.events[type] === 'function'
    ) {
      props.item.events[type](...args) // 事件触发
    }
  },
})

let UsedComponent: any = null
const componentEvents = reactive<{
  isVueComponent: Function
  initComponent: Function
  originSupportList: string[]
}>({
  isVueComponent: (comp: any): boolean => {
    const vnode: any = h(comp)
    if (!vnode.type) {
      return false
    }
    // Check if it's just an HTML Element
    if (typeof vnode.type === 'string') {
      return false
    }
    // A component that has render or setup property
    if (vnode.type.setup || vnode.type.render) {
      return true
    }

    // Check if functional component
    // https://vuejs.org/guide/extras/render-function.html#functional-components
    if (vnode.type.emits || vnode.type.props) {
      return true
    }

    return false
  },
  initComponent: () => {
    if (!props.item.component) {
      return console.error('component is required in renders')
    }
    if (typeof props.item.component === 'string') {
      if (componentEvents.originSupportList.includes(props.item.component)) {
        UsedComponent = props.item.component // element 原生组件
      } else {
        const componentLists = import.meta.glob(
          `./extend-components/*/index.vue`
        )
        for (const key in componentLists) {
          const injectKey = key.split('/')[2]
          if (injectKey === props.item.component) {
            UsedComponent = defineAsyncComponent(
              () => import(`./extend-components/${injectKey}/index.vue`)
            )
            return
          }
        }
      }
    } else {
      if (componentEvents.isVueComponent(props.item.component))
        UsedComponent = markRaw(props.item.component)
      else {
        console.error('component is not a vue component')
      }
    }
  },
  originSupportList: [
    'el-input',
    'el-input-number',
    'el-date-picker',
    'el-upload',
  ], // 支持的 element 组件列表
})

watch(
  () => props.item.destory,
  (value: boolean) => {
    if (props.item.deleteWithDestory && value) {
      formEvents.getModelValue = undefined // 该属性决定value是否随着destory一起销毁
    }
  }
)

componentEvents.initComponent()
onMounted(() => {
  formEvents.subEvents('onMounted', {
    // 手动添加一个 onMounted 钩子
    value: formEvents.getModelValue,
    item: props.item,
  })
})
</script>

<style lang="scss" scoped></style>
