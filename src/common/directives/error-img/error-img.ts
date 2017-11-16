import * as angular from 'angular'
import {IAttributes} from 'angular'

class ErrorImageClass implements ng.IDirective {
  public restrict: string = 'A'

  /* @ngInject */
  constructor() {
  }

  public link = (_scope: ng.IScope,
                 element: ng.IRootElementService,
                 attrs: IAttributes): void => {
    element.bind('error', () => {
      if (attrs.src !== attrs.errorImage) {
        attrs.$set('src', attrs.errorImage)
      }
    })
  }

  public static getInstance = (): () => ErrorImageClass => {
    const instance = (): ErrorImageClass =>
      new ErrorImageClass()
    instance.$inject = []
    return instance
  }
}

const errorImage =  angular.module('profitelo.directives.error-image', [])
.directive('errorImage', ErrorImageClass.getInstance())
  .name

export default errorImage