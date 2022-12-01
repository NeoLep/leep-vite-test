<template>
  <el-button @click="getRawValues">get data</el-button>
  <div id="codeEditBox" ref="codeEditBoxRef"></div>
</template>
<script lang="ts" setup>
import * as monaco from 'monaco-editor';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
const editor = ref()
const codeEditBoxRef = ref()
const initEditor = () => {
    console.log(monaco.languages.getLanguages())
      if (!codeEditBoxRef.value) return
      // 初始化编辑器，确保dom已经渲染
      editor.value = monaco.editor.create(codeEditBoxRef.value, {
        value: '', //编辑器初始显示文字
        language: 'json', //此处使用的python，其他语言支持自行查阅demo
        theme: 'vs-light', //官方自带三种主题vs, hc-black, or vs-dark
        selectOnLineNumbers: true,//显示行号
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: 'line', //光标样式
        automaticLayout: true, //自动布局
        glyphMargin: true, //字形边缘
        useTabStops: false,
        fontSize: 15, //字体大小
        autoIndent: 'full', //自动布局
        quickSuggestionsDelay: 100, //代码提示延时
      });
      // 监听值的变化
      editor.value.onDidChangeModelContent((val: any) => {
      	// console.log(val.changes[0].text)
      })
}
const getRawValues = () => {
  const values = toRaw(editor.value).getValue()
  console.log(values)
  return values
}
onMounted(() => {
  initEditor()
   })
</script>
<style lang="scss" scoped>
#codeEditBox {
  height: 100vh;
}
</style>