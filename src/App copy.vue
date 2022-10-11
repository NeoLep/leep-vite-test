<template>
  <FormRenders v-if="true" passivity :renders="setRenders" :forms="setForms" :ref="e => formEvents.formsRef = e">
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
  <el-dialog v-model="outerVisible" title="Outer Dialog">
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
  </el-dialog>
</template>

<script lang="ts" setup>
import FormRenders from './components/form-renders/index.vue'
import SearchRenders from './components/search-renders/index.vue'
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
    size: "large",
    'scroll-to-error': true
    // labelWidth: '20px',
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
      label: 'cascader', prop: 'sex', type: 'cascader',
      slots: 'sexSlot',
      props: {
        clearable: true,
      },
      options: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
                {
                  value: 'feedback',
                  label: 'Feedback',
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency',
                },
                {
                  value: 'controllability',
                  label: 'Controllability',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation',
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation',
                },
              ],
            },
          ],
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout',
                  disabled: true,
                },
                {
                  value: 'color',
                  label: 'Color',
                },
                {
                  value: 'typography',
                  label: 'Typography',
                },
                {
                  value: 'icon',
                  label: 'Icon',
                },
                {
                  value: 'button',
                  label: 'Button',
                },
              ],
            },
          ],
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'docs',
              label: 'Design Documentation',
            },
          ],
        },
      ],
      events: {
        change: (infos: any) => {
          console.log(infos)
        }
      }
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
      label: '时间选择',
      prop: 'dates',
      type: 'time-select',
      formItemsProps: {},
      props: {
        clearable: false
      },
      events: {
        change: (infos: any) => {
          console.log('changed', infos)
        }
      },

    },
    {
      label: '监听Topic',
      prop: 'listenTopic',
      type: 'custom',
      slots: {default: 'listenTopicSlot', label: 'listenTopicLabelSlot'},
    } 
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
        {label: '姓名', prop: 'name', type: 'input', events: {
          change: (val: string) => {
            console.log(searchRendersRef)
            if (val === '李鹏') {
              if(!searchFormsRenders.renders.renders.list[1].props) searchFormsRenders.renders.renders.list[1].props = {}
              if(!searchFormsRenders.renders.renders.list[2].props) searchFormsRenders.renders.renders.list[2].props = {}
              // searchRendersRef.value.getFormsRef().setValue('sex', 1)
              // searchRendersRef.value.getFormsRef().setValue('age', 23)
              searchFormsRenders.forms['sex'] = 1
              searchFormsRenders.forms['age'] = 23
              searchFormsRenders.renders.renders.list[1].props['disabled'] = true
              searchFormsRenders.renders.renders.list[2].props['disabled'] = true

            } else {
              if(!searchFormsRenders.renders.renders.list[1].props) searchFormsRenders.renders.renders.list[1].props = {}
              if(!searchFormsRenders.renders.renders.list[2].props) searchFormsRenders.renders.renders.list[2].props = {}
              searchFormsRenders.renders.renders.list[1].props['disabled'] = false
              searchFormsRenders.renders.renders.list[2].props['disabled'] = false
            }
          } 
        }},
        {label: '年龄', prop: 'age', type: 'input-number', default: 100 },
        {label: '性别', prop: 'sex', type: 'select', options: [
          { label: '男', value: 1},
          { label: '女', value: 0},
          { label: '不确定', value: 2},
        ]},
      ]
    }
  }
})
console.log(import.meta.env)
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
