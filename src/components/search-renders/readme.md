## search-renders: 搜索器生成器 
基于 form-renders 的搜索器生成器组件

### props
**passivity: 被动模式**
* type: boolean
* default: null/false

为了防止出现随意在外部随意修改forms中数据的情况，默认对该属性进行关闭，只有当该属性为 true 时，v-model 才能成功注入，当该属性为 false 时，不会将modelValue与forms进行绑定

**modelValue: form实例**
* type: Object,
* default: null

双向绑定的 forms，用来向外部暴露 forms 对象的属性，当 passivity 为 false 时，该属性不会有任何作用，控制台会显示错误提示

**renders: 渲染列表**
*  type: Object
*  default: null
*  required: true

渲染的列表数据，用来渲染整个搜索表单的结构
  
  **renders**: {
  * renders: 用来渲染 forms-renders 组件的列表数据，详情参考 form-renders 的文档
  * opertaionPosition: 操作区域的位置 bottom/bottom-center/bottom-right/bottom-left/right 默认为 right，当值为 bottom 时，与 bottom-right 一致
  * submitText: 搜索按钮的显示文字，默认为(查询)
  * resetText: 重置按钮的显示文字, 默认为(重置)
  
  }

  
### slots
* **bottom**: 底部的插槽
* **right**: 右侧的插槽


### ref属性
**getFormsRef**
  * type: function
  * params: ( )
  * return: FormRenderRef
  
  **说明:** 该方法仅会暴露出内部的 form-renders 组件的 ref 实例, 可以使用该实例对 内部的 form 进行操作，form-renders 的 ref 实例，情参考 form-renders 的文档

**getFormsValue**
  * type: function
  * params: ( )
  * return: Object
  
  **说明:** 该方法会返回当前搜索器中的forms内容