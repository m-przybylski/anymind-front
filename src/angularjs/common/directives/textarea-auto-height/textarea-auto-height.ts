import * as angular from 'angular'

class TextareaAutoHeightClass implements ng.IDirective {
  public restrict: string = 'A'
  private static readonly elementMaxHeight: number = 300

  constructor() {
  }

  public link = (_scope: ng.IScope,
                 _element: ng.IRootElementService,
                 $log: ng.ILogService): void => {

    const element = _element.find('textarea')

    if (element[0]) {
      element[0].addEventListener('input', () => {
        this.resizeElement(element[0])
      })
    } else {
      $log.error('Can not find element to resize')
    }
  }

  private resizeElement = (element: HTMLElement): void => {
    element.style.height = 'auto'
    element.style.height = String(Math.min(element.scrollHeight, TextareaAutoHeightClass.elementMaxHeight)) + 'px'
  }

  public static getInstance = (): () => TextareaAutoHeightClass => {
    const instance = (): TextareaAutoHeightClass =>
      new TextareaAutoHeightClass()
    instance.$inject = []
    return instance
  }
}

const textareaAutoHeight = angular.module('profitelo.directives.textarea-auto-height', [])
.directive('textareaAutoHeight', TextareaAutoHeightClass.getInstance())
  .name

export default textareaAutoHeight