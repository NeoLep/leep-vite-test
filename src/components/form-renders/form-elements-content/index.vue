<template>
  <div class="forms-element-content">
    <component v-if="props.renders?.type.constructor === Object && props.renders?.type.type === 'element-plus' && props.renders?.type.name"
      :is="props.renders?.type.name" v-bind="props.renders?.props || {}" ref="elementRef" v-model="getModelValue"
      :renders="renders" :slots-list-orign="slotsList" :slots-list-transform="slotsEvents.slotsTransform(slotsList)"
      @update:modelValue="(val: any) => emit('update:modelValue', val)"
      @input="(...args: any) => subEvents.getEvents('input', elementRef, args)"
      @change="(...args: any) => subEvents.getEvents('change', elementRef, args)"
      @blur="(...args: any) => subEvents.getEvents('blur', elementRef, args)"
      @focus="(...args: any) => subEvents.getEvents('focus', elementRef, args)"
      @clear="(...args: any) => subEvents.getEvents('clear', elementRef, args)"
      @visible-change="(...args: any) => subEvents.getEvents('visible-change', elementRef, args)"
      @remove-tag="(...args: any) => subEvents.getEvents('remove-tag', elementRef, args)"
      @calendar-change="(...args: any) => subEvents.getEvents('calendar-change', elementRef, args)"
      @panel-change="(...args: any) => subEvents.getEvents('panel-change', elementRef, args)" />
    <div v-else>
      <div v-if="!componentLists['form-' + props.renders?.type]">
      could not find component named
      <span style="color: red">{{ 'form-' + props.renders?.type }}</span>
    </div>
    <component :is="componentLists['form-' + props.renders?.type]" v-else v-bind="props.renders?.props || {}"
      ref="elementRef" v-model="getModelValue" :renders="renders" :slots-list-orign="slotsList"
      :slots-list-transform="slotsEvents.slotsTransform(slotsList)"
      @update:modelValue="(val: any) => emit('update:modelValue', val)"
      @input="(...args: any) => subEvents.getEvents('input', elementRef, args)"
      @change="(...args: any) => subEvents.getEvents('change', elementRef, args)"
      @blur="(...args: any) => subEvents.getEvents('blur', elementRef, args)"
      @focus="(...args: any) => subEvents.getEvents('focus', elementRef, args)"
      @clear="(...args: any) => subEvents.getEvents('clear', elementRef, args)"
      @visible-change="(...args: any) => subEvents.getEvents('visible-change', elementRef, args)"
      @remove-tag="(...args: any) => subEvents.getEvents('remove-tag', elementRef, args)"
      @calendar-change="(...args: any) => subEvents.getEvents('calendar-change', elementRef, args)"
      @panel-change="(...args: any) => subEvents.getEvents('panel-change', elementRef, args)">
      <template v-for="slotItem in slotsList" #[slotItem]="scoped">
        <slot :name="slotItem" :pop="{ ...scoped.pop }"></slot>
      </template>
    </component>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { slotsTransformResultObjects } from './form-elements-content.interface'

const componentLists: any = {}
const itemsList: any = import.meta.globEager('./*/index.vue')
const emit = defineEmits(['update:modelValue', 'eventsSubs'])

const props = defineProps({
  slotsList: Object,
  renders: Object,
  modelValue: null,
})

const getModelValue = computed({
  get: () => props.modelValue,
  set: (value: any) => emit('update:modelValue', value),
})
// ????????????
for (const key in itemsList) {
  const injectKey = key.split('/')[1]
  componentLists[injectKey] = defineAsyncComponent(
    () => import(`./${injectKey}/index.vue`)
  )
}

// ????????????
const subEvents = {
  getEvents: (types: string, refIs: any, getArgs: any) => {
    if (!props.renders?.prop)
      console.error('could not found prop in this render', props.renders)
    const sendProtos = {
      prop: props.renders?.prop, // ??????????????? prop ????????????
      eventName: types, // ????????????????????? input,change,focus,blur,change...
      args: {
        // ?????????????????????????????????
        beforeUpdateValue: refIs.getOldValue ? refIs.getOldValue() : null, // ??????????????????
        afterUpdateValue: props.modelValue, // ??????????????????
        args: getArgs, // element ???????????????????????????
        rendersProto: props.renders, // render ??????
      },
    }
    emit('eventsSubs', sendProtos) // ?????????????????????
  },
}

// ?????????item???ref
const elementRef = ref(null)

// slots ????????????
const slotsEvents = {
  slotsTransform: (slotsList: any): any => {
    const resultObjects: slotsTransformResultObjects = {
      slotPropsList: [],
      slotRenamedList: [],
    }
    for (const key in slotsList) {
      resultObjects.slotPropsList.push(key)
      resultObjects.slotRenamedList.push(slotsList[key])
    }
    return resultObjects
  },
}

onMounted(() => {
  if (props.renders?.mountedTrigger) {
    if (typeof props.renders.mountedTrigger === 'string') {
      subEvents.getEvents(props.renders.mountedTrigger, elementRef, [
        props.modelValue,
      ])
    } else if (Array.isArray(props.renders.mountedTrigger)) {
      props.renders.mountedTrigger.forEach((item: any) => {
        if (typeof item === 'string') {
          subEvents.getEvents(item, elementRef, [props.modelValue])
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.forms-element-content {
  width: 100%;
  height: 100%;

  :deep(.form-items-achieve) {
    width: 100%;
    height: 100%;
  }
}
</style>
