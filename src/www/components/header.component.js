import { HTML, nFlex } from '../libs/afrontend/index.js'
import { TwoColumnsComponent } from '../components/two.columns.component.js'
import { ButtonComponent } from '../components/button.component.js'
import { TextComponent } from '../components/text.component.js'

export class HeaderComponent extends HTML {
  children = {
    left: new TextComponent({ text: 'P0' }),
    right: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TwoColumnsComponent({
      html1: this.getLeft(),
      html2: this.getRight(),
    }))
  }

  getLeft() {
    return this.children.left
  }

  getRight() {
    this.children.right.setStyle('text-align', 'right')
    this.children.right.append(new ButtonComponent({ text: 'LOGIN', onclick: () => this.onLoginButtonClick() }))
    return this.children.right
  }

  onLoginButtonClick() {
    this.dispatch('login')
    this.children.right.clear()
    this.children.right.append(new ButtonComponent({ text: 'SAVE', onclick: () => this.onSaveButtonClick() }))
  }

  onSaveButtonClick() {
    this.dispatch('save')
  }
}
