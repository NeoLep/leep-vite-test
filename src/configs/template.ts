import ElementItemsServices from '@/services/element-items.services'
const rendersConfigList: any = {
  'trigger-device': (forms: any) => {
    return [
      {
        label: '节点名称',
        prop: 'name',
        type: 'input',
        props: {
          placeholder: `请输入节点名称`,
        },
        rules: [
          {
            required: true,
            trigger: 'blur',
            message: `请输入节点名称`,
          },
        ],
      },
      {
        label: '设备类型',
        prop: 'deviceTypeID',
        type: 'async-select',
        rules: [
          { required: true, trigger: 'change', message: '请选择设备类型' },
        ],
        props: {
          placeholder: '请选择设备类型',
        },
        events: {
          change: (value: any) => {
            forms.deviceID = null
          },
        },
        // asyncOptionsTrigger: ['visible-change'],
        disabledRequestMounted: false,
        asyncOptions: async (eventCollections: any) => {
          try {
            eventCollections.updateLoading(true)
            const deviceTypeList = await ElementItemsServices.getDeviceType()
            const deviceTypeOptions = deviceTypeList.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))
            eventCollections.updateOptions(deviceTypeOptions)
          } catch (err) {
            console.log(err)
          } finally {
            eventCollections.updateLoading(false)
          }
        },
      },
      {
        label: '设备',
        prop: 'deviceID',
        type: 'async-select',
        rules: [{ required: true, trigger: 'change', message: '请选择设备' }],
        props: {
          placeholder: '请选择设备',
        },
        events: {
          change: (value: any) => {
            forms.points = null
          },
        },
        disabledRequestMounted: false,
        asyncOptionsTrigger: ['visible-change'],
        asyncOptions: async (eventCollections: any) => {
          try {
            eventCollections.updateLoading(true)
            const deviceList = await ElementItemsServices.getDeviceList(
              forms.deviceTypeID
            )
            if (!deviceList.devices) deviceList.devices = []
            const deviceOptions = deviceList.devices.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))
            eventCollections.updateOptions(deviceOptions)
          } catch (err) {
            console.log(err)
          } finally {
            eventCollections.updateLoading(false)
          }
        },
      },
      {
        label: '设备点位',
        prop: 'points',
        type: 'async-select',
        rules: [
          { required: true, trigger: 'change', message: '请选择设备点位' },
        ],
        props: {
          placeholder: '请选择设备点位',
        },
        events: {
          change: (value: any) => {},
        },
        disabledRequestMounted: false,
        asyncOptionsTrigger: ['visible-change'],
        asyncOptions: async (eventCollections: any) => {
          try {
            eventCollections.updateLoading(true)
            const pointList = await ElementItemsServices.getPointsList(
              forms.deviceID
            )
            if (!pointList.points) pointList.points = []
            const deviceOptions = pointList.points.map((item: any) => ({
              label: item.name,
              value: item.pointID,
            }))
            eventCollections.updateOptions(deviceOptions)
          } catch (err) {
            console.log(err)
          } finally {
            eventCollections.updateLoading(false)
          }
        },
      },
      {
        label: '状态',
        prop: 'states',
        type: 'select',
        options: [
          { label: '离线', value: 'offline' },
          { label: '工作中', value: 'working' },
          { label: '待机', value: 'standby' },
          { label: '故障', value: 'fault' },
          { label: '关机', value: 'poweroff' },
        ],
        props: {
          placeholder: '请选择状态',
        },
        rules: [{ required: true, trigger: 'change', message: '请选择状态' }],
      },
    ]
  },
}

export { rendersConfigList }
