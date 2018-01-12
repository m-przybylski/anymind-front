import * as angular from 'angular'
import {IDirective} from 'angular'
import uiRouter from '@uirouter/angularjs'

function proRangeSlider($timeout: ng.ITimeoutService): IDirective<ng.IScope> {

  function linkFunction(scope: any, _elem: ng.IRootElementService, _attrs: ng.IAttributes): void {
    /* istanbul ignore next */
    scope.refreshSlider = (): void => {
      $timeout(() => {
        scope.$broadcast('rzSliderForceRender')
      })
    }

    scope.options = {
      floor: 0,
      ceil: 20,
      onEnd: (_sliderId: string, modelValue: string, highValue: string, pointerType: string): void => {
        scope.callback(modelValue, highValue, pointerType)
      }
    }

  }

  return {
    template: require('./pro-range-slider.html'),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      minValue: '=',
      maxValue: '=',
      callback: '=',
      label: '@'
    }
  }

}

angular.module('profitelo.directives.interface.pro-range-slider', [
  uiRouter,
  'rzModule'
])
  .directive('proRangeSlider', proRangeSlider)