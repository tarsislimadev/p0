import { HTML, nButton } from '../libs/afrontend/index.js'

export class ButtonComponent extends nButton {
  state = {
    text: '',
    onclick: (() => { }),
  }

  constructor({ text = '', onclick = (() => { }) } = {}) {
    super()
    this.state.text = text
    this.state.onclick = () => onclick()
  }

  onCreate() {
    super.onCreate()

    this.setText(this.state.text)
    this.addEventListener('click', () => this.state.onclick())
  }
}
