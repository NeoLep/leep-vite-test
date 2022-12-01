<template>
  {{ formEvents.getModelValue }}
  <el-form class="form-render" :model="formEvents.getModelValue">
    <el-row v-bind="renderEvents.layoutConfigs?.row?.props">
      <template v-for="item in renderEvents.listConfigs">
          <el-col v-if="'hide' in item.attrs ? !item.attrs.hide : true" v-bind="renderEvents.layoutConfigs.col?.props || {}"
            :span="item.attrs.span || renderEvents.layoutConfigs.col.props.span || 6">
            <el-form-item :label="item.label" :prop="item.prop" :label-width="item.attrs.labelWidth || 80" :rules="item.rules">
              <slot v-if="item.component === 'custom'" :name="item.slot" :data="formEvents.getModelValue[item.prop]" :prop="item.prop"></slot>
              <controller-render
                v-else
                v-model="formEvents.getModelValue[item.prop]"
                :item="item"
                :render-level="props.renderLevel + 1"
                @subEvents="formEvents.getSubEvents"
              ></controller-render>
            </el-form-item>
          </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import ControllerRender from './controller-render/index.vue'
const emits = defineEmits(['update:modelValue', 'subEvents'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  renders: {
    type: Object,
    default: null
  },
  renderLevel: {
    type: Number,
    default: 0
  },
  prop: {
    type: String,
    default: ""
  }
})

const renderEvents = reactive<{
  layoutConfigs: any,
  listConfigs: any,
  initRenders: Function,
  initLayoutRenders: Function,
  initListRenders: Function,
}>({
  layoutConfigs: {},
  listConfigs: {},
  initRenders: () => {
    if (!props.renders) return
    renderEvents.initLayoutRenders()
    renderEvents.initListRenders()
  },
  initLayoutRenders: () => {
    let layOut: any = {}
    if (props.renders.layout) layOut = props.renders.layout

    renderEvents.layoutConfigs.row = layOut || {}
    if (!renderEvents.layoutConfigs.row.props) renderEvents.layoutConfigs.row.props = {}
    if (!('gutter' in renderEvents.layoutConfigs.row.props)) renderEvents.layoutConfigs.row.props.gutter = 20
    renderEvents.layoutConfigs.col = layOut.col || {}
    if (!renderEvents.layoutConfigs.col) renderEvents.layoutConfigs.col = {}
    if (!renderEvents.layoutConfigs.col.props) renderEvents.layoutConfigs.col.props = {}
    if (!renderEvents.layoutConfigs.col.props.span) renderEvents.layoutConfigs.col.props.span = 6
  },
  initListRenders: () => {
    props.renders.list.map((item: any, index: number) => {
      item.isValid = true // 该 item 项是否有效, 默认为 true
      if (!item.prop) {
        item.isValid = false // 不写 prop 无效
        console.error("渲染错误, 错误项: " + index)
        console.error("prop 为必填参数, 请填写prop参数: ", item)
        item.prop = "errorProps" + index
      }
      if (!item.attrs) item.attrs = {}
      if (!item.props) item.props = {}
      if (!item.events) item.events = false
      if (!item.slots) item.slots = false

      if (item.attrs.appendClass && typeof item.attrs.appendClass === "string") item.attrs.appendClass = [item.attrs.appendClass]
      else if (!item.attrs.appendClass) item.attrs.appendClass = []

      renderEvents.listConfigs[item.prop] = item
    })
    // console.log(renderEvents.listConfigs)
  },
})

const formEvents = reactive({
  getModelValue: computed({
    get: () => {
      if (JSON.stringify(props.modelValue) === '{}') return reactive({})
      else return props.modelValue
    },
    set: (value: any) => {
      emits('update:modelValue', value)
    }
  }),
  updateModelValue: () => {
    emits('update:modelValue', formEvents.getModelValue)
  },
  getSubEvents: (configs: any) => {
    if (props.renderLevel !== 0) {
      if (props.prop.trim()) {
        configs.prop = props.prop.trim() + '.' + configs.prop
      }
      emits('subEvents', configs) // 对事件进行发布
    } else {
      if (configs.cycle === 'mounted' && JSON.stringify(formEvents.getModelValue) === '{}') return
      let copyObject = {
        forms: configs.cycle === 'mounted' ? {} : formEvents.getModelValue,
        renderList: props.renders
      }

        configs.events.call(copyObject, ...configs.args)
    }
  },
  getDatas: () => {
    return {
      forms: formEvents.getModelValue,
      renderList: props.renders
    }
  }
})

onMounted(() => {
  renderEvents.initRenders()

  watch(props.renders, () => {
    renderEvents.initRenders()
  })
  watch(formEvents.getModelValue, (value: any) => {
    formEvents.updateModelValue()
  })
})

</script>

<style lang="scss" scoped>
.form-render {
  /* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
}
</style>