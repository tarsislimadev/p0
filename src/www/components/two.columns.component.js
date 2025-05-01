import { HTML, nFlex } from '../libs/afrontend/index.js'

export class TwoColumnsComponent extends HTML {
  children = { html1: new HTML(), html2: new HTML(), }

  state = { widths: ['50', '50'] }

  constructor({ html1 = new HTML(), html2 = new HTML() } = {}) {
    super()
    this.children.html1 = html1
    this.children.html2 = html2
  }

  onCreate() {
    super.onCreate()

    const flex = new nFlex()
    flex.setStyle('padding', 'calc(1rem / 4)')

    const html1 = new HTML()
    html1.setContainerStyle('width', this.state.widths[0] + '%')
    html1.append(this.children.html1)
    flex.append(html1)

    const html2 = new HTML()
    html2.setStyle('text-align', 'right')
    html2.setContainerStyle('width', this.state.widths[1] + '%')
    html2.append(this.children.html2)
    flex.append(html2)

    this.append(flex)
  }
}
