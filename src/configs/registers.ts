import { Graph, ToolsView, EdgeView } from '@antv/x6'
import { createApp, h } from 'vue'
import MenusComp from './menus.vue'

const app = ref()
// tooltip
class TooltipTool extends ToolsView.ToolItem<EdgeView, TooltipToolOptions> {
  private knob: HTMLDivElement
  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false) as HTMLDivElement
      this.knob.style.position = 'absolute'
      this.container.appendChild(this.knob)
      const that = this
      app.value && app.value.unmount(this.knob)
      this.updatePosition(this.options.e)
      app.value = createApp({
        setup() {
          return () =>
            h(MenusComp, {
              onClickedOperated: (opeType: string) => {
                console.log('get operation', opeType)
                that.toggleTooltip(false)
              }
            })
          },
      })
      app.value.mount(this.knob)
    }
    return this
  }

  private toggleTooltip(visible: boolean) {}

  private updatePosition(e?: MouseEvent) {
    const style = this.knob.style
    if (e) {
      const p = this.graph.clientToGraph(e.x, e.y)
      style.display = 'block'
      style.left = `${p.x}px`
      style.top = `${p.y}px`
    } else {
      style.display = 'none'
      style.left = '-1000px'
      style.top = '-1000px'
    }
  }

  delegateEvents() {
    this.cellView.on('cell:click', () => {
      this.updatePosition()
    }, this)
    return super.delegateEvents()
  }
}

TooltipTool.config({
  tagName: 'div',
  isSVGElement: false,
})

export interface TooltipToolOptions extends ToolsView.ToolItem.Options {
  tooltip?: string
}

export const regist = () => {
  //线
  Graph.registerEdgeTool('tooltip', TooltipTool, true)
  //节点
  Graph.registerNodeTool('tooltip', TooltipTool, true)
}