import {IInputComponentBindings} from './input'
import {keyboardCodes} from '../../../classes/keyboard'

type InputTypes = 'text' | 'tel' |'number'

export class InputComponentController implements IInputComponentBindings {
  private textType: InputTypes = 'text'
  private telType: InputTypes = 'tel'
  private numberType: InputTypes = 'number'

  public id: string
  public name: string
  public type: string = this.textType
  public inputText: string = ''
  public placeholder: string
  public validationText: string
  public maxLength: string = ''
  public isValid: boolean
  public ngRequired: boolean = false
  public ngModel: string
  public isFocus: boolean = false
  public isDirty: boolean = false
  public onChange: string = ''

  /* @ngInject */
  constructor(private $element: JQuery) {}

  $onInit(): void {
    if (this.type === this.telType) {
      this.blockInvalidDigits([keyboardCodes.backspace, keyboardCodes.enter, keyboardCodes.zero, keyboardCodes.one,
        keyboardCodes.two, keyboardCodes.three, keyboardCodes.four, keyboardCodes.five, keyboardCodes.six,
        keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine, keyboardCodes.arrowRight, keyboardCodes.arrowLeft
      ])
    } else if (this.type === this.numberType) {
      this.blockInvalidDigits([keyboardCodes.dot, keyboardCodes.comma, keyboardCodes.backspace, keyboardCodes.enter,
        keyboardCodes.zero, keyboardCodes.one, keyboardCodes.two, keyboardCodes.three, keyboardCodes.four,
        keyboardCodes.five, keyboardCodes.six, keyboardCodes.seven, keyboardCodes.eight, keyboardCodes.nine,
        keyboardCodes.arrowRight, keyboardCodes.arrowLeft
      ])
    }
  }

  public blockInvalidDigits = (digitsCodes: number[]): void => {
    this.$element.find('input').bind('keypress keydown', (event) => {

      if (this.isKeyAllowed(digitsCodes, event) && this.isCtrlKeyAllowed(event)) {
        event.preventDefault()
      }
    })
  }

  private isCtrlKeyAllowed = (event: JQueryKeyEventObject): boolean => !(event.ctrlKey || event.metaKey)

  private isKeyAllowed = (digitsCodes: number[], event: JQueryKeyEventObject): boolean => {
    const code = event.keyCode || event.which
    return digitsCodes.indexOf(code) === -1
  }

  $onDestroy = (): void => {
    this.$element.find('input').unbind('keypress')
  }

  public onFocus = (): void => {
    this.isFocus = true
    this.isDirty = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }
}
