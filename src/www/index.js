import { HTML } from './libs/afrontend/index.js'
import { HeaderComponent } from './components/header.component.js'
import { FooterComponent } from './components/footer.component.js'

const TEXT = `
webhook=>start: Webhook 1|past:>http://www.google.com[blank]
e=>end: End:>http://www.google.com
op1=>operation: My Operation|past:$myFunction
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|request
para=>parallel: parallel tasks

webhook->op1(right)->cond
cond(yes)->c2
cond(no)->para
c2(true)->io->e
c2(false)->e

para(path1, bottom)->e
para(path2)->op2->e
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
    chart.drawSVG('canvas', {})
    console.log({ chart })
  }

  getHTML() {
    this.children.html.setAttr('id', 'canvas')
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
