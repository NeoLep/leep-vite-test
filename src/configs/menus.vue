<template>
  <div class="menus" style="background: #fff">
    <div class="item" v-for="item in keyList" :class="{'item-divider': item.type === 'divider'}" @click="emits('clickedOperated', item.emitName)">
      <div class="label" v-if="item.label">{{item.label}}</div>
      <div class="ope" v-if="item.ope">{{item.ope}}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(['clickedOperated'])
let systemType = 'Windows'
const keyList: any = ref([])
const initKeyList = () => {
  var system = navigator.userAgent.toLowerCase();
  var iphone = system.indexOf("iphone");
  var ipad = system.indexOf("ipad");
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (iphone !== -1 || ipad !== -1 || isMac) {
    systemType = 'macOS'
  }
  let operKey = 'Ctrl'
  if (systemType === 'macOS') {
    operKey = 'Cmd'
  }
  keyList.value = [
    { label: '撤销', ope: operKey + '+Z', emitName: 'undo' },
    { label: '恢复', ope: operKey + '+Shift+Z', emitName: 'redo' },
    { type: 'divider', emitName: '' },
    { label: '剪切', ope: operKey + '+X', emitName: 'cut' },
    { label: '复制', ope: operKey + '+C', emitName: 'copy' },
    { label: '粘贴', ope: operKey + '+V', emitName: 'paste' },
    { label: '删除', ope: 'Delete', emitName: 'delete' },
  ]
}
onMounted(() => {
 initKeyList()
})
</script>
<style lang="scss" scoped>
.menus  {
  display: inline-block;
  min-width: 160px;
  min-height: 32px;
  margin: 0;
  padding: 4px 0;
  background-color: #fff;
  outline: 0;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  .item-divider {
    display: block;
    width: 100%;
    height: 1px !important;
    margin: 4px 0;
    background: hsla(0,0%,58.8%,.2);
    pointer-events: none;
    box-sizing: border-box;
    &:hover {
      background: hsla(0,0%,58.8%,.2) !important;
    }
  }
  .item {
    display: flex;
    padding: 0 12px;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    &:hover {
      color: #262626;
      background: #f5f5f5;
    }
    .label {
      width: 50px;
      text-align: left;
    }
    .ope {
      flex: 1;
      text-align: right;
      // color: ;
      font-size: 13px;
    opacity: .75;
    }
  }
}
</style>