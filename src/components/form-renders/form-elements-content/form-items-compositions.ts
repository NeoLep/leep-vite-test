export const extendProps = {
  renders: null,
  modelValue: null,
  slotsListOrign: null, // 插槽列表原始值
  slotsListTransform: null // 插槽列表转换对象
}

export const extendEmits = ['update:modelValue', 'eventsSubs']

export function FormItemsCompositions(itemProps: any, emit: any) {
  const store = {
    oldValue: null
  }

  function updateValue(value: any) {
    emit('update:modelValue', value)
  }

  return {
    store,
    emit,
    updateValue
  }

}