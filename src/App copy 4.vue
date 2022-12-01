<template>
  {{ nana }}
  <component :is="'el-input'" v-model="nana" />
  <hr>
  {{ setForms }}
  <hr>
  <FormRenders style="width: 60%; margin: 100px auto; border: 1px solid red;padding: 10px;" v-if="true" passivity
    :renders="setRenders" v-model="setForms" :ref="e => formEvents.formsRef = e">
    <template #customLineSlots="{data}">
      <div style="height: 40px; text-align: center; font-weight: bold; line-height: 40px;">Name</div>
    </template>
    <template #listenTopicLabelSlot="{data}">
      {{ data.label }}
    </template>
    <template #listenTopicSlot>
      <el-button style="width: 100%">+Topic</el-button>
    </template>
    <template #footer>
      <el-button @click="sub">sub</el-button>
    </template>
  </FormRenders>
  <div v-if="false">
    source: {{ searchFormsRenders.forms }}
    <SearchRenders ref="searchRendersRef" :renders="searchFormsRenders.renders" v-model="searchFormsRenders.forms" />
  </div>
  <!-- <el-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >open the inner Dialog</el-button
        >
      </div>
    </template>
  </el-dialog> -->
</template>

<script lang="ts" setup>
import { markRaw } from "vue";
import FormRenders from './components/form-renders/index.vue'
import SearchRenders from './components/search-renders/index.vue'
const nana = ref(null)

const sub = async () => {
  await formEvents.formsRef.validate((valid: any, fields: any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const searchRendersRef = ref()

const setForms = reactive({})

const setRenders = reactive({
  layout: {
    gutter: 20,
    span: 24
  },
  props: {
    size: "normal",
    'scroll-to-error': true,
    labelWidth: '110px',
    // labelPosition: 'top',
    // 'hide-required-asterisk': true
  },
  list: [
    {
      label: '姓名', prop: 'name', type: 'input',
      rules: [
        { required: true, message: 'name is required' },
      ],
      slots: { prepend: 'namePrependSlot', append: 'nameAppendSlot' },
      formItemsProps: {
        // labelWidth: '120px'
      },
      props: {
        'controls-position': 'right'
      },
      events: {
        change: (infos: any) => {
          console.log(infos)
        },
        input: (infos: any) => {
          console.log('prop name got input events', infos);
          // if (!setRenders.list[1]['props']) setRenders.list[1]['props'] = {}
          // if (infos.afterUpdateValue * 1 > 10) {
          //   console.log('set disabled state');
          //   setRenders.list[1]['props']['disabled'] = true
          // } else {
          //   setRenders.list[1]['props']['disabled'] = false
          // }
        }
      }
    },
    {
      label: '性别', prop: 'sex', type: 'input',
      rules: [
      ],
    },
    {
      type: 'custom-line',
      slots: 'customLineSlots'
    },
    {
      label: '单选',
      prop: 'radios',
      type: 'checkbox',
      options: [
        { label: 'male', value: 1 },
        { label: 'female', value: 0 }
      ],
      events: {
        change: (infos: any) => {
          console.log(infos)
        }
      }
    },
    {
      label: '自开发组件',
      prop: 'custom-comp',
      type: 'component',
      rules: [
        { required: true, message: '自开发组件必填内容', trigger: 'blur'}
      ],
      component: markRaw(defineAsyncComponent(() => import('./custom/button.vue'))),
      props: {
        name: 1,
        sex: 1
      }
    },
    {
      label: '补充表单',
      prop: 'extra-forms',
      type: 'forms',
      renders: {
        layout: {
          gutter: 20,
          span: 24
        },
        props: {
          labelWidth: '0',
          zeroPadding: true,
          size: "large",
          'scroll-to-error': true
          // labelWidth: '20px',
          // labelPosition: 'top',
          // 'hide-required-asterisk': true
        },
        list: [
          {
            label: '', prop: 'name', type: 'input',
            rules: [
            ],
            slots: { prepend: 'namePrependSlot', append: 'nameAppendSlot' },
            formItemsProps: {
              labelWidth: '0px',
              // zeroPadding: true
              // 'label-width': 0
            },
            
            props: {
              'controls-position': 'right',
            },
            events: {
              change: (infos: any) => {
                console.log(infos)
              },
              input: (infos: any) => {
                console.log('prop name got input events', infos);
                // if (!setRenders.list[1]['props']) setRenders.list[1]['props'] = {}
                // if (infos.afterUpdateValue * 1 > 10) {
                //   console.log('set disabled state');
                //   setRenders.list[1]['props']['disabled'] = true
                // } else {
                //   setRenders.list[1]['props']['disabled'] = false
                // }
              }
            }
          },
          {
            label: '',
            prop: 'sex',
            type: 'input',
            rules: [],
          },
          {
            label: '',
            prop: 'radios',
            type: 'checkbox',
            options: [
              { label: 'male', value: 1 },
              { label: 'female', value: 0 }
            ],
            events: {
              change: (infos: any) => {
                console.log(infos)
              }
            }
          },
          // {
          //   label: '自开发组件',
          //   prop: 'custom-comp',
          //   type: 'component',
          //   component: markRaw(defineAsyncComponent(() => import('./custom/button.vue'))),
          //   props: {
          //     name: 1,
          //     sex: 1
          //   }
          // },
        ]
      }
    },
  ]
})
const formEvents = reactive({
  formsRef: ref(),
  submitForms() {
    // .validate()
    this.formsRef.validate((valid: any) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
})

const searchFormsRenders = reactive({
  forms: reactive({}),
  renders: {
    opertaionPosition: 'right',
    passivity: true,
    renders: {
      layout: {
        span: 24
      },
      list: [
        {
          label: '姓名', prop: 'name', type: 'input', events: {
            change: (val: string) => {
              console.log(searchRendersRef)
              if (val === '李鹏') {
                if (!searchFormsRenders.renders.renders.list[1].props) searchFormsRenders.renders.renders.list[1].props = {}
                if (!searchFormsRenders.renders.renders.list[2].props) searchFormsRenders.renders.renders.list[2].props = {}
                // searchRendersRef.value.getFormsRef().setValue('sex', 1)
                // searchRendersRef.value.getFormsRef().setValue('age', 23)
                searchFormsRenders.forms['sex'] = 1
                searchFormsRenders.forms['age'] = 23
                searchFormsRenders.renders.renders.list[1].props['disabled'] = true
                searchFormsRenders.renders.renders.list[2].props['disabled'] = true

              } else {
                if (!searchFormsRenders.renders.renders.list[1].props) searchFormsRenders.renders.renders.list[1].props = {}
                if (!searchFormsRenders.renders.renders.list[2].props) searchFormsRenders.renders.renders.list[2].props = {}
                searchFormsRenders.renders.renders.list[1].props['disabled'] = false
                searchFormsRenders.renders.renders.list[2].props['disabled'] = false
              }
            }
          }
        },
        { label: '年龄', prop: 'age', type: 'input-number', default: 100 },
        {
          label: '性别', prop: 'sex', type: 'select', options: [
            { label: '男', value: 1 },
            { label: '女', value: 0 },
            { label: '不确定', value: 2 },
          ]
        },
      ]
    }
  }
})
console.log(import.meta.env)
console.log(setRenders)
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
