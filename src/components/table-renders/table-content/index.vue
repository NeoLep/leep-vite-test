<template>
  <span v-if="!props.item.component && !initDone">{{ props.data }}</span>
  <div v-if="props.item.component && initDone">
    <component
      :is="UsedComponent"
      :data="props.data"
      :item="props.item"
      :row="props.row"
    ></component>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: null,
    default: '',
  },
  row: {
    type: Object,
    default: () => ({}),
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})

let UsedComponent: any = null
const componentEvents = reactive<{
  isVueComponent: Function
  hasComponent: Function
  initComponent: Function
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
  hasComponent: (component: any): boolean => {
    if (!component) return false
    if (typeof component === 'string') {
      const componentLists = import.meta.glob(`./extend-components/*/index.vue`)
      for (const key in componentLists) {
        const injectKey = key.split('/')[2]
        if (injectKey === component) {
          componentEvents.initComponent(component)
          return true
        }
      }
    } else {
      if (!componentEvents.isVueComponent(component)) {
        console.error(`${component} is not a vue component`)
        return false
      }
      componentEvents.initComponent(component)
      return true
    }
    return false
  },
  initComponent: (component: any) => {
    if (typeof component === 'string') {
      UsedComponent = defineAsyncComponent(
        () => import(`./extend-components/${component}/index.vue`)
      )
    } else {
      UsedComponent = markRaw(component)
    }
    initDone.value = true
  },
})
const initDone = ref(false)
if (componentEvents.hasComponent(props.item.component)) initDone.value = true
</script>

<style lang="scss" scoped></style>
