<template>
  <el-form
    ref="elFormRef"
    :model="getModelValue"
    style="width: 100%"
    :label-position="props.renders.labelAttrs?.labelPosition || 'left'"
  >
    <el-row
      style="width: 100%"
      v-bind="props.renders.layout?.row?.props || {}"
      :gutter="
        props.renders.layout?.row?.props?.gutter >= 0
          ? props.renders.layout?.row?.props?.gutter
          : 20
      "
    >
      <template v-for="(renderItem, index) in props.renders.list || []">
        <el-col
          v-if="renderItem.destory ? false : true"
          v-show="renderItem.hidden ? false : true"
          :key="renderItem.prop + '-render-' + index"
          v-bind="props.renders.layout?.col?.props || {}"
          :span="renderItem.span || props.renders.layout?.col?.props?.span || 6"
          style="width: 100%"
        >
          <el-form-item
            :label="renderItem.label"
            :prop="renderItem.prop"
            :label-width="
              props.renders.labelAttrs?.labelWidth ||
              renderItem.labelAttrs?.labelWidth ||
              'auto'
            "
            :rules="renderItem.rules || []"
          >
            <template #label>
              <slot
                v-if="typeof renderItem.labelAttrs?.slots === 'string'"
                :name="renderItem.labelAttrs.slots"
              ></slot>
              <div
                v-else
                class="el-form-item__label"
                style="width: 100%"
                :class="
                  useMixinStyle(
                    renderItem.labelAttrs?.appendClass,
                    props.renders.labelAttrs?.appendClass
                  )
                "
                :style="
                  useMixinStyle(
                    renderItem.labelAttrs?.appendStyle,
                    props.renders.labelAttrs?.appendStyle
                  )
                "
              >
                {{ renderItem.label }}
                <span
                  v-if="
                    props.renders.labelAttrs?.hasColon ||
                    renderItem.labelAttrs?.hasColon
                  "
                >
                  :
                </span>
              </div>
            </template>
            <div
              class="el-form-item__content"
              :class="renderItem.appendClass || {}"
              :style="renderItem.appendStyle || {}"
              style="width: 100%"
            >
              <template v-if="renderItem.component === 'slots'">
                <slot
                  v-for="slotsItem in useRenderSlots(renderItem)"
                  :name="slotsItem['slotName']"
                ></slot>
              </template>
              <form-item
                v-else
                v-model="getModelValue[renderItem.prop]"
                style="width: 100%"
                :item="renderItem"
                :form="getModelValue"
              >
                <template
                  v-for="slotsItem in useRenderSlots(renderItem)"
                  #[slotsItem.slotName]
                >
                  <slot :name="slotsItem['slotName']"></slot>
                </template>
              </form-item>
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { useRenderSlots, useMixinStyle } from './use-form-builder'
import formItem from './form-item/index.vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  renders: {
    type: null,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})
const getModelValue = useVModel(props, 'modelValue', emits)

const elFormRef = ref()

defineExpose({
  clearValidate: (...args: any) => elFormRef.value.clearValidate(...args),
  resetFields: (...args: any) => elFormRef.value.resetFields(...args),
  scrollToField: (...args: any) => elFormRef.value.scrollToField(...args),
  validate: (...args: any) => elFormRef.value.validate(...args),
  validateField: (...args: any) => elFormRef.value.validateField(...args),
})
</script>

<style lang="scss" scoped></style>
