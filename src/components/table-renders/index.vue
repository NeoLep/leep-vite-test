<template>
  <el-table
    v-bind="props.renders?.props || {}"
    :data="getTableData"
    class="cus-table"
  >
    <template v-for="(columnItem, index) in props.renders.list || []">
      <el-table-column
        v-if="!columnItem.destory"
        :key="'table-column' + columnItem.prop + index"
        v-bind="{ ...props.renders.columnProps, ...columnItem.props } || {}"
        :label="columnItem.label"
        :prop="columnItem.prop"
        :class="columnItem.appendClass || {}"
      >
        <template #default="scoped">
          <slot
            v-if="useSlots(columnItem.slots)"
            :name="columnItem.slots"
            :row="scoped.row"
          ></slot>
          <span v-else>
            <span v-if="!scoped.row[columnItem.prop] && columnItem.prop">
              -
            </span>
            <table-content
              v-else
              :data="scoped.row[columnItem.prop]"
              :row="scoped.row"
              :item="columnItem"
            />
          </span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import TableContent from './table-content/index.vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  renders: {
    type: Object,
    default: () => ({
      props: {},
      list: [],
    }),
  },
})

const getTableData = computed(() => {
  if (props.renders?.props?.data) {
    return props.renders?.props?.data
  } else {
    return props.data
  }
})

const currentInstance = getCurrentInstance()
const useSlots = (slotsName: any): boolean => {
  if (typeof slotsName !== 'string') return false
  if (!currentInstance || !currentInstance.slots) return false
  return slotsName in currentInstance.slots
}
</script>

<style lang="scss" scoped>
.cus-table {
  width: 100%;
}
</style>
