<template>
  <div>
    <template
      v-for="(buttonItem, index) in props.item.button || []"
      :key="'btn' + index"
    >
      <el-popconfirm
        v-if="buttonItem.type === 'delete'"
        :title="buttonItem.title || t('confirmDelete')"
        @confirm="subEvents(buttonItem)"
      >
        <template #reference>
          <el-button type="danger" :underline="false" link>
            {{ buttonItem.text }}
          </el-button>
        </template>
      </el-popconfirm>
      <el-button
        v-else
        v-bind="buttonItem.props || {}"
        :style="buttonItem.appendStyle"
        @click="subEvents(buttonItem)"
      >
        {{ buttonItem.text }}
      </el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ inheritLocale: true }) // useI18n
const props = defineProps({
  data: {
    type: null,
    default: null,
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

const subEvents = (item: any) => {
  if (item.events?.click && typeof item.events.click == 'function') {
    item.events.click(props.row)
  }
}
</script>

<style lang="scss" scoped></style>

<i18n lang="yaml">
# en:
zh:
  confirmDelete: 您确定要执行删除操作吗?
</i18n>
