import { getCurrentInstance } from "vue";

export function setModelValue() { 
  return {
    modelValue: {
      tupe: null,
      default: null
    }
  }
} // 返回props
export function useVModel(props: any, key?: string, emit?: any) {
  if (!key) key = "modelValue"
  const vm = getCurrentInstance();
  if (!vm) return console.error("无法获取 vm")
  vm.props.modelValue = null
  const _emits = emit || vm?.emit;
  const event = `update:${key}`;

  return computed({
    get: () => {
      return props[key]
    },
    set: (value: any) => {
      _emits(event, value)
    }
  })
} // 动态绑定