import {TextareaComponentController} from './textarea.controller'

export class InputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = TextareaComponentController
  template = require('./textarea.html')
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    maxLength: '@',
    isValid: '<',
    ngModel: '=',
    isSubmitted: '<',
    onChange: '<'
  }
}