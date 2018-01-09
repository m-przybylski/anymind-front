import * as angular from 'angular'
import {InputComponent} from './textarea.component'
import ValidationAlertModule from '../alert/validation-alert/validation-alert'
import textareaAutoHeight from '../../../directives/textarea-auto-height/textarea-auto-height'

export interface ITextareaComponentBindings extends ng.IController {
  id: string
  name: string
  inputText: string
  placeholder: string
  validationText: string
  isValid: boolean
  isSubmitted?: boolean
  maxLength: string
  onChange?: (description: string) => void
  ngModel: string
}

const textareaModule = angular.module('profitelo.components.interface.textarea', [
  'pascalprecht.translate',
  ValidationAlertModule,
  textareaAutoHeight
])
.component('textareaPrimary', new InputComponent)
  .name

export default textareaModule
