<template>
  <div class="controller-render">
    <div v-if="renderEvents.initOk">
      <div v-if="!usedComponent" class="controller-render--error">
        无法找到对应的组件，请确认组件是否正确: {{ props.item.component }}
      </div>
      <component
        v-else 
        v-bind="item.props" 
        v-model="formEvents.getModelValue"
        class="controller-render__element__component" 
        :class="item.attrs?.appendClass || []"
        :style="item.attrs?.appendStyle || {}" 
        :is=usedComponent
        :prop="props.item.prop"
        :ref="(el: any) => renderEvents.componentRef = el"
        :render-level="props.renderLevel + 1"
        @click="(...args: any) => formEvents.subEvents('click', 'running', ...args)"
        @input="(...args: any) => formEvents.subEvents('input', 'running', ...args)"
        @change="(...args: any) => formEvents.subEvents('change', 'running', ...args)"
        @blur="(...args: any) => formEvents.subEvents('blur', 'running', ...args)"
        @focus="(...args: any) => formEvents.subEvents('focus', 'running', ...args)"
        @clear="(...args: any) => formEvents.subEvents('clear', 'running', ...args)"
        @visible-change="(...args: any) => formEvents.subEvents('visible-change', 'running', ...args)"
        @remove-tag="(...args: any) => formEvents.subEvents('remove-tag', 'running', ...args)"
        @calendar-change="(...args: any) => formEvents.subEvents('calendar-change', 'running', ...args)"
        @panel-change="(...args: any) => formEvents.subEvents('panel-change', 'running', ...args)"
        >
        <div v-if="item.childs" v-for="childComponent in item.childs">
          <controller-render 
            v-if="childComponent.prop" 
            :item="childComponent"
            :render-level="props.renderLevel + 1"
            v-model="formEvents.getModelValue[childComponent.prop]"
            >
          </controller-render>
          <controller-render 
            v-else 
            :item="childComponent"
            :render-level="props.renderLevel + 1"
            ></controller-render>
        </div>
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ControllerRender from './index.vue'
import { elementComponentList } from './element-components.config'
const emits = defineEmits(['update:modelValue', 'subEvents'])
const props = defineProps({
  modelValue: {
    type: null,
    default: null
  },
  item: {
    type: Object,
    default: () => ({})
  },
  renderLevel: {
    type: Number,
    default: 0
  }
})

let usedComponent: any = null
const renderEvents = reactive({
  initOk: false,
  componentRef: ref(),
  initComponent: () => {
    if (props.item.component === 'cus-form' && !props.item.prop.trim()) {
      return console.error('cus-form 需要存在 prop 参数')
    }
    if (typeof props.item.component === 'function') {
      usedComponent = defineAsyncComponent(props.item.component)
    }
    if (elementComponentList.includes(props.item.component)) usedComponent = props.item.component
    else {
      const componentLists = import.meta.glob(`./extend-components/*/index.vue`)
      // 判断
      for (const key in componentLists) {
        const injectKey = key.split('/')[2]
        if (injectKey === props.item.component) {
          usedComponent = defineAsyncComponent(() => import(`./extend-components/${injectKey}/index.vue`))
          return
        }
      }
    }
  },
  judgeCreateObject: () => {
    if (props.item.childs) {
      for (let i = 0; i < props.item.childs.length; i++) {
        if (props.item.childs[i]['prop']) {
          formEvents.getModelValue = {}
          return
        }
      }
    }
  }
})
const formEvents = reactive({
  getModelValue: computed({
    get: () => {
      if (props.modelValue) return props.modelValue
      else {
        if (props.item.dataType && props.item.dataType.toLowerCase() === 'object') {
          emits('update:modelValue', {})
          return reactive({})
        }
        else return null
      } 
    },
    set: (value: any) => {
      emits('update:modelValue', value)
    }
  }),
  updateModelValue: () => {
    emits('update:modelValue', formEvents.getModelValue)
  },
  subEvents: (type: string, cycle: string, ...args: any) => {
    if (!props.item.events) return
    if (!props.item.events[type] || typeof props.item.events[type] !== 'function') return
    emits('subEvents', {
      type: 'origin',
      eventsName: type,
      events: props.item.events[type],
      cycle: cycle,
      args: args,
    })
    if (props.item.events[type + '-ful'] || typeof props.item.events[type + '-ful'] === 'function') {
      emits('subEvents', {
        type: 'ful',
        eventsName: type,
        events: props.item.events[type + '-ful'],
        args: {
          prop: props.item.prop,
          item: props.item,
          eventsName: type,
          args: args,
          ref: renderEvents.componentRef,
          cycle: cycle,
        },
      })
    }
  },
  onMountedTrigger: () => {
    if (props.item.onMounted && Array.isArray(props.item.onMounted)) {
      props.item.onMounted.forEach((item: any) => {
        if (typeof item === 'string' && props.item.events[item] && typeof props.item.events[item] === 'function') {
          formEvents.subEvents(item, 'mounted', formEvents.getModelValue)
        } else if (typeof item === 'function') {
          emits('subEvents', {
            type: 'ful',
            eventsName: 'custom',
            events: item,
            args: {
              prop: props.item.prop,
              item: props.item,
              eventsName: "custom",
              args: [formEvents.getModelValue],
              ref: renderEvents.componentRef,
              cycle: "mounted",
            },
          })
        }
      })
    }
  },
})

// renderEvents.judgeCreateObject()
renderEvents.initComponent()

onMounted(() => {
  renderEvents.initOk = true
  formEvents.onMountedTrigger()
  watch(() => formEvents.getModelValue, (value: any) => {
    formEvents.updateModelValue()
  })
})
</script>

<style lang="scss" scoped>
.controller-render {
  width: 100%;

  .controller-render__element__component {
    width: 100%;
  }

  .controller-render--error {
    color: red;
  }
}
</style>