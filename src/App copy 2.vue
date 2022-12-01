<template>
  <el-button style="position: absolute; bottom: 20px; left: 20px; z-index: 11100" @click="showInfos">SHOW Infos
  </el-button>
  <div class="antv-x6-test">
    <div class="swaper" id="swaper" :ref="el => refList.swaperRef.value = el"></div>
    <div class="container" id="container" :ref="el => refList.containerRef.value = el"></div>
  </div>
</template>
<script lang="ts" setup>
import { Graph, Shape, Addon } from '@antv/x6';


const showInfos = () => {
  console.log(antsEvents.GraphProto)
  return
  // 获取数据
  // console.log(antsEvents.GraphProto.toJSON())
  // 插入数据
  antsEvents.GraphProto.fromJSON({"cells":[{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"08a687f6-5909-4b5c-91d9-5383a46447da","zIndex":0,"source":{"cell":"21b77898-c705-4abd-b4e8-96d00dbfc731","port":"520ba21f-bcd0-4fb0-947f-4a8634ffea90"},"target":{"cell":"d24cb0cb-3a76-4d69-aac5-24d4fe6f5c26","port":"453458dd-27f3-4223-a2bb-a1dfcf12001f"}},{"position":{"x":220,"y":90},"size":{"width":66,"height":36},"attrs":{"text":{"text":"开始"},"body":{"rx":20,"ry":26}},"visible":true,"shape":"custom-rect","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"0b708047-33c7-42a5-b155-e0c88d6c65e6"},{"group":"right","id":"731649ae-1f23-4490-bdae-59053c789966"},{"group":"bottom","id":"520ba21f-bcd0-4fb0-947f-4a8634ffea90"},{"group":"left","id":"b68654ee-e409-4789-9f30-536e467efeed"}]},"id":"21b77898-c705-4abd-b4e8-96d00dbfc731","zIndex":1},{"position":{"x":280,"y":200},"size":{"width":66,"height":36},"attrs":{"text":{"text":"过程"}},"visible":true,"shape":"custom-rect","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"453458dd-27f3-4223-a2bb-a1dfcf12001f"},{"group":"right","id":"14929247-1638-446b-b430-fc3359aba76f"},{"group":"bottom","id":"9d9fa141-7176-4ea7-b294-068c47762097"},{"group":"left","id":"dbbb0dee-3d0a-4f39-803d-c63b17770ea0"}]},"id":"d24cb0cb-3a76-4d69-aac5-24d4fe6f5c26","zIndex":2}]});
  // console.log(antsEvents.GraphProto.model.getNodes()) // 获取画布中所有节点数据
  // console.log(antsEvents.GraphProto.model.getEdges()) // 获取画布中所有连接线数据
}

const refList = {
  swaperRef: ref(),
  containerRef: ref()
}
const antsEvents = <{
  GraphProto: any,
  StencilProto: any,
  createGraph: Function,
  createStencil: Function
}>{
    GraphProto: reactive({}),
    StencilProto: null,
    createGraph(options: any) {
      return new Graph(options);
    },
    createStencil(options: any) {
      return new Addon.Stencil(options)
    }
  }

const graphEvents = {
  nodes: {
    r1: {
      nodeId: 'r1',
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        onlyOne: true,
        body: {
          rx: 20,
          ry: 26,
        },
      },
      ports: {
        "groups": {
        "left": {
            "position": "left",
            "attrs": {
                "portBody": {
                    "magnet": "passive",
                    "r": 6,
                    "stroke": "#5F95FF",
                    "fill": "#fff",
                    "strokeWidth": 1
                },
                "circle": {
                    "r": 4,
                    "magnet": "passive",
                    "stroke": "#5F95FF",
                    "strokeWidth": 1,
                    "fill": "#fff",
                    "style": {
                        "visibility": "hidden"
                    }
                }
            }
        },
        "right": {
            "position": "right",
            "attrs": {
                "circle": {
                    "r": 4,
                    "magnet": true,
                    "stroke": "#5F95FF",
                    "strokeWidth": 1,
                    "fill": "#fff",
                    "style": {
                        "visibility": "hidden"
                    }
                }
            }
        }
        },
        "items": [
        {
            "id": "in",
            "group": "left"
        },
          {
            "id": "out",
            "group": "right"
        }
        ]
      }
    },
    r2: {
      nodeId: 'r2',
      shape: 'custom-rect',
      label: '过程',
      ports: {
        "groups": {
        "left": {
            "position": "left",
            "attrs": {
                "portBody": {
                    "magnet": "passive",
                    "r": 6,
                    "stroke": "#5F95FF",
                    "fill": "#fff",
                    "strokeWidth": 1
                },
                "circle": {
                    "r": 4,
                    "magnet": "passive",
                    "stroke": "#5F95FF",
                    "strokeWidth": 1,
                    "fill": "#fff",
                    "style": {
                        "visibility": "hidden"
                    }
                }
            }
        },
        "right": {
            "position": "right",
            "attrs": {
                "circle": {
                    "r": 4,
                    "magnet": true,
                    "stroke": "#5F95FF",
                    "strokeWidth": 1,
                    "fill": "#fff",
                    "style": {
                        "visibility": "hidden"
                    }
                }
            }
        }
        },
        "items": [
          {
            "id": "in",
            "group": "left"
        },
          {
            "id": "out",
            "group": "right"
        }
        ]
      }
    },
    r3: {
      nodeId: 'r3',
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    },
    r4: {
      nodeId: 'r4',
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
        },
      },
      label: '决策',
    },
    r5: {
      nodeId: 'r5',
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
      label: '数据',
    },
    r6: {
      nodeId: 'r6',
      shape: 'custom-circle',
      label: '连接',
    }


  },
  returnPorts: (positions: any) => {
    const groups: any = {
      top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            portBody: {
              magnet: 'passive',
              r: 6,
              stroke: '#5F95FF',
              fill: '#fff',
              strokeWidth: 1,
            },
            circle: {
              r: 4,
              magnet: 'passive',
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
    }
    const ports = <{
      groups: any,
      items: any
    }> {
      groups: {},
      items: [],
    }
    positions.forEach((item: any) => {
      const existStatus = groups[item] ? true : false
      if (existStatus && !ports.groups[item]) {
        ports.groups[item] = { ...groups[item] }
        ports.items.push({
          group: item,
        })
      }
    })
    // console.log(ports)
    return {...ports}
  },
  rigistPoints: () => {
    
    Graph.registerNode(
      'custom-rect',
      {
        inherit: 'rect',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: graphEvents.returnPorts(['left', 'right']),
      },
      true,
    )

    Graph.registerNode(
      'custom-polygon',
      {
        inherit: 'polygon',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: graphEvents.returnPorts(['right', 'left']),
      },
      true,
    )

    Graph.registerNode(
      'custom-circle',
      {
        inherit: 'circle',
        width: 45,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: graphEvents.returnPorts(['right']),
      },
      true,
    )

    Graph.registerNode(
      'custom-image',
      {
        inherit: 'rect',
        width: 52,
        height: 52,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            stroke: '#5F95FF',
            fill: '#5F95FF',
          },
          image: {
            width: 26,
            height: 26,
            refX: 13,
            refY: 16,
          },
          label: {
            refX: 3,
            refY: 2,
            textAnchor: 'left',
            textVerticalAnchor: 'top',
            fontSize: 12,
            fill: '#fff',
          },
        },
        ports: graphEvents.returnPorts(['right']),
       },
      true,
    )

  },
  renderLeftItems: (graph: any, stencil: any) => {
    graphEvents.rigistPoints()
    const r1 = graph.createNode({
      nodeId: 'start',
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        onlyOne: true,
        body: {
          rx: 20,
          ry: 26,
        },
      },
    })

    const r2 = graph.createNode({
      shape: 'custom-rect',
      label: '过程',
    })

    const r3 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    })

    const r4 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
        },
      },
      label: '决策',
    })

    const r5 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
      label: '数据',
    })
    
    const r6 = graph.createNode({
      shape: 'custom-circle',
      label: '连接',
    })
    
    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

    const imageShapes = [
      {
        label: 'Client',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
      },
      {
        label: 'Http',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
      },
      {
        label: 'Api',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
      },
      {
        label: 'Sql',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
      },
      {
        label: 'Clound',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
      },
      {
        label: 'Mq',
        image:
          'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
      },
    ]
    const imageNodes = imageShapes.map((item) =>
      graph.createNode({
        shape: 'custom-image',
        label: item.label,
        attrs: {
          image: {
            'xlink:href': item.image,
          },
        },
      }),
    )
    stencil.load(imageNodes, 'group2')
    // #endregion
  },
  registConnectLine: (graph: any) => {
    // 控制连接桩显示/隐藏
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    graph.on('node:mouseenter', () => {
      const container = refList.containerRef.value!
      const ports: any = container.querySelectorAll(
        '.x6-port-body',
      )
      showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
      const container = refList.containerRef.value!
      const ports: any = container.querySelectorAll(
        '.x6-port-body',
      )
      showPorts(ports, false)
    })
  },
  listenPorts: (graph: any) => {
    graph.on("edge:connected", ({ e, isNew, edge, previousCell, currentCell }) => {
     const source = edge.getSourceCell();
     // 删除之后也会调用这个方法，source为空
     if (!source) {
       return;
     }
     let json = graph.toJSON();
      console.log("连接边的操作", json, json.cells);
      console.log("----")
      console.log(edge)
     
    //  // 判断是否连接的目标节点的输入点
    //  if (edge.shape === "dag-edge") {
    //    const edgeSource = edge.source.port
    //    const edgeTarget = edge.target.port
    //    const edgeInput = allTrim(edgeSource.split('_')[3]) // 从字符串中把类型取出来
    //    const edgeOutput = allTrim(edgeTarget.split('_')[3])
    //    if (
    //      // 判断是否是输出节点和输入节点相连
    //      edgeSource.indexOf("output") === -1 ||
    //      edgeTarget.indexOf("input") === -1
    //      || edgeInput !== edgeOutput // 或者input和output类型不相同
    //    ) {
    //      graph.removeEdge(edge.id); // 取消连接边的操作
    //    }
    //  }
    //  graph.set(json);
   }
 );
  }
}

onMounted(() => {
  // 初始化画布
  const options = {
    container: refList.containerRef.value,
    grid: true,
    allowLoop: false,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: {
        name: 'manhattan',
        args: {
          padding: 1,
        },
      },
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet, targetView }) {
        const node: any = targetView.cell
        if (targetMagnet.getAttribute('port-group') === 'right') {
          return false
        } else {
          return true
        }
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
    resizing: true,
    rotating: true,
    selecting: {
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
  }
  antsEvents.GraphProto = reactive(antsEvents.createGraph(options))
  // 初始化左侧
  antsEvents.StencilProto = antsEvents.createStencil({
    title: '流程图',
    target: antsEvents.GraphProto,
    stencilGraphWidth: 250,
    stencilGraphHeight: 180,
    collapsable: true,
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
      {
        title: '系统设计图',
        name: 'group2',
        graphHeight: 250,
        layoutOptions: {
          rowHeight: 70,
        },
      },
    ],
    validateNode: (node: any, options: any) => {
      console.log(node.attrs)
      // console.log(options)
    },
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  })
  antsEvents.StencilProto.container.width = "100%"
  antsEvents.StencilProto.container.height = "100%"
  refList.swaperRef.value.append(antsEvents.StencilProto.container)
  graphEvents.renderLeftItems(antsEvents.GraphProto, antsEvents.StencilProto)
  graphEvents.registConnectLine(antsEvents.GraphProto)
  graphEvents.listenPorts(antsEvents.GraphProto)

  antsEvents.GraphProto.on('cell:selected', ({cell}: any, e: any) => {
    // cell.cell.setAttrs('text', {text: "nonoon"}) 
    console.log(cell.getAttrs())
    cell.setAttrs({
      text: {
        text: "nononno"
      }
    })
  })

})
</script>
<style lang="scss" scoped>
#container {
  display: flex;
  border: 1px solid #dfe3e8;
}

#stencil {
  width: 180px;
  height: 100%;
  position: relative;
  border-right: 1px solid #dfe3e8;
}

#graph-container {
  width: calc(100% - 180px);
  height: 100%;
}

.x6-widget-stencil {
  background-color: #fff;
}

.x6-widget-stencil-title {
  background-color: #fff;
}

.x6-widget-stencil-group-title {
  background-color: #fff !important;
}

.x6-widget-transform {
  margin: -1px 0 0 -1px;
  padding: 0px;
  border: 1px solid #239edd;
}

.x6-widget-transform>div {
  border: 1px solid #239edd;
}

.x6-widget-transform>div:hover {
  background-color: #3dafe4;
}

.x6-widget-transform-active-handle {
  background-color: #3dafe4;
}

.x6-widget-transform-resize {
  border-radius: 0;
}

.x6-widget-selection-inner {
  border: 1px solid #239edd;
}

.x6-widget-selection-box {
  opacity: 0;
}

.antv-x6-test {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;

  .swaper {
    width: 250px;
    height: 100%;
    background-color: #eee;
    position: relative;
  }

  .container {
    flex: 1;
    height: 100%;
    background-color: #ccc;
  }
}
</style>