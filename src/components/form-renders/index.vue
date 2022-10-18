<template>
  <div class="form-renders">
    <el-form
      v-bind="formEvents.props"
      :ref="(el: any) => (formEvents.formsRef = el)"
      class="form-container"
      :model="formEvents.forms"
      :label-width="formEvents.props.labelWidth || '80px'"
      @validate="(...args:any) => emit('validate', ...args)"
    >
      <el-row :gutter="formEvents.layout.gutter || 20" class="row">
        <el-col
          v-for="item in formEvents.renderList || []"
          :span="item.span || formEvents.layout.span || 6"
          class="col"
        >
          <el-form-item
            v-if="'hide' in item ? !item.hide : true"
            v-bind="item.formItemsProps || {}"
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules || []"
            class="form-item"
          >
            <template #label>
              <slot
                :name="loaderEvents.labelSlotsList[item.prop]"
                :data="item"
              ></slot>
            </template>
            <form-elements-content
              v-if="item.type !== 'custom'"
              v-model="formEvents.forms[item.prop]"
              :renders="item"
              :slots-list="loaderEvents.slotsList[item.prop]"
              @eventsSubs="selfEvents.getEventsSubs"
            >
              <template
                v-for="slotItem in loaderEvents.slotsList[item.prop]"
                #[slotItem]="scoped"
              >
                <slot :name="slotItem" :pop="{ ...scoped.pop }"></slot>
              </template>
            </form-elements-content>
            <div v-else style="width: 100%">
              <slot
                :name="item.slots.default || item.slots"
                :renders="item"
              ></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <slot name="footer"></slot>
      </el-form-item>
    </el-form>
    <div class="right-slots-zone">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormElementsContent from './form-elements-content/index.vue'

const emit = defineEmits(['validate'])

const props = defineProps({
  modelValue: null,
  passivity: Boolean, // 是否暴露form给上级组件
  forms: {
    // forms 实例
    type: Object,
  },
  renders: {
    // 渲染列表
    type: Object,
    default: {},
  },
})

const formEvents: any = reactive({
  formsRef: ref(null),
  props: reactive({}),
  layout: reactive({}),
  forms: reactive({}),
  renderList: reactive([]),
  renderListEvents: {},
})

const loaderEvents: any = {
  labelSlotsList: reactive({}),
  slotsList: reactive({}),
  rendersLoader: () => {
    // 整个 forms 进行loader[入口]
    formEvents.props = props.renders.props
      ? JSON.parse(JSON.stringify(props.renders.props))
      : {} // 需要向 el-form 组件中插入的 props
    formEvents.layout = props.renders.layout
      ? JSON.parse(JSON.stringify(props.renders.layout))
      : {} // 需要向 el-form 组件中插入的 layout
    props.renders.list.forEach((item: any) => {
      // 插入 events 列表
      formEvents.renderListEvents[item.prop] = item.events
        ? { ...item.events }
        : {}
      if (item.default) {
        // 注入default默认值
        formEvents.forms[item.prop] = item.default
      }
    })
    formEvents.renderList = props.renders.list // 插入 el-items 列表
    loaderEvents.slotsListEventsLoader() // 对 slots 配置项进行分发
  },
  slotsListEventsLoader: (): any => {
    // 插槽装载[未使用的插槽不会进行注册]
    const { slots } = getCurrentInstance()
    const slotsResult: any = {}
    formEvents.renderList.forEach((renderItem: any) => {
      slotsResult[renderItem.prop] = {}
      if (!renderItem.slots) return
      if (renderItem.slots.label && slots[renderItem.slots.label]) {
        // 设置 label 插槽
        if (!loaderEvents.labelSlotsList) loaderEvents.labelSlotsList = {}
        loaderEvents.labelSlotsList[renderItem.prop] = renderItem.slots.label
      }
      if (renderItem.slots.constructor == String) {
        // slotsResult[renderItem.prop]['default'] = renderItem.slots  // 旧逻辑对所有插槽配置进行插入-无论是否使用
        if (slots[renderItem.slots])
          slotsResult[renderItem.prop]['default'] = renderItem.slots // 如果存在插槽则进行插入
      } else if (renderItem.slots.constructor == Object) {
        // slotsResult[renderItem.prop] = { ...slotsResult[renderItem.prop], ...renderItem.slots } // 旧逻辑对所有插槽配置进行插入-无论是否使用
        Object.entries(renderItem.slots).forEach(([key, value]) => {
          if (slots[value]) slotsResult[renderItem.prop][key] = value
        })
      } else {
        console.error(
          `slots only accepts string, Object, in prop :${renderItem.props}`
        )
      }
    })
    loaderEvents.slotsList = slotsResult
    return slotsResult
  },
}

const selfEvents = {
  // 自身方法
  getEventsSubs(infos: any) {
    if (
      formEvents.renderListEvents[infos.prop][infos.eventName] &&
      typeof formEvents.renderListEvents[infos.prop][infos.eventName] ===
        'function'
    ) {
      // 默认抛出，只抛出element组件原生自带的参数
      formEvents.renderListEvents[infos.prop][infos.eventName](
        ...(infos.args.args || {})
      )
    }
    // 全抛出模式，如果存在 [(eventName)-full] 类型的方法进行全抛出 { eventName, prop, args: { beforeUpdateValue, afterUpdateValue, args } }
    if (
      formEvents.renderListEvents[infos.prop][`${infos.eventName}-getFull`] &&
      typeof formEvents.renderListEvents[infos.prop][
        `${infos.eventName}-getFull`
      ] === 'function'
    ) {
      formEvents.renderListEvents[infos.prop][`${infos.eventName}-getFull`](
        infos
      )
    }
  },
}

const exportEvents = {
  // 需要暴露的属性与方法
  getFormsValue() {
    return JSON.parse(JSON.stringify(formEvents.forms))
  },
  validate: (...args: any) => {
    formEvents.formsRef.validate(...args)
  },
  validateField: (...args: any) => {
    formEvents.formsRef.validateField(...args)
  },
  resetFields: (...args: any) => {
    formEvents.formsRef.resetFields(...args)
  },
  scrollToField: (...args: any) => {
    formEvents.formsRef.scrollToField(...args)
  },
  clearValidate: (...args: any) => {
    formEvents.formsRef.clearValidate(...args)
  },
  setValue: (key: string, value: any) => {
    formEvents.forms[key] = value
  },
}

const install = () => {
  //  props.passivity: 被动状态
  // 判断是否为被动状态: 被动状态决定 form-render 内部 forms 是否被暴露，并决定 props 中的 forms 是否有效
  if (!props.passivity && props.modelValue) {
    console.error(
      'error from form-renders, props modelValue[v-model] only available when props passivity is true'
    )
  } else if (props.passivity && props.modelValue) {
    // console.info('passivity mode open')
    formEvents.forms = props.modelValue
  }

  // 配置项拆分
  if (props.renders) {
    loaderEvents.rendersLoader()
  }
}

// loaded form renders
install()

// expose
defineExpose({
  ...exportEvents,
})
</script>
<style lang="scss" scoped>
.form-renders {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  .form-container {
    flex: 1;
  }
}
</style>
