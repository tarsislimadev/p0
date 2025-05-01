import { HTML } from './libs/afrontend/index.js'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'

const TEXT = `
start=>start: start:>http://www.google.com[blank]
e=>end: end:>http://www.google.com
op1=>operation: op1:$myFunction
op2=>operation: op2:$myFunction
cond=>condition: yes or no?:$myFunction
c2=>condition: good idea:$myFunction

start->op1->cond
cond(yes)->c2
cond(no)->e
c2(true)->op2->e
c2(false)->e
`

class FlowChartComponent extends HTML {
  children = {
    html: new HTML(),
  }

  state = {
    code: '',
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHTML())
    this.setEvents()
  }

  setEvents() {
    this.addEventListener('update', ({ value }) => this.onUpdate({ value }))
  }

  onUpdate({ value } = {}) {
    const chart = flowchart.parse(TEXT)
    chart.drawSVG('flowchart', {})
  }

  getHTML() {
    this.children.html.setAttr('id', 'flowchart')
    return this.children.html
  }
}

export class Page extends HTML {
  children = {
    header: new HeaderComponent(),
    flow_chart: new FlowChartComponent(),
    footer: new FooterComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getFlowChart())
    this.append(this.getFooter())
  }

  getHeader() {
    this.children.header.addEventListener('login', () => {})
    this.children.header.addEventListener('save', () => this.children.flow_chart.dispatch('update'))
    return this.children.header
  }

  getFlowChart() {
    return this.children.flow_chart
  }

  getFooter() {
    return this.children.footer
  }
}
