// tslint:disable:no-let
// tslint:disable:readonly-array
// tslint:disable:only-arrow-functions
// tslint:disable:no-invalid-this
// tslint:disable:newline-before-return
import * as angular from 'angular';
import { IWindowService } from '../../../services/window/window.service';

function defaultSliderFunction($window: IWindowService,
                               $timeout: ng.ITimeoutService,
                               $element: ng.IRootElementService): void {
  let elementsMap: number[] = [];
  let currentElement = 0;
  let parentWidth = $element[0].offsetWidth;
  let visibleItem = 0;

  function _elementsWidth(): void {
    elementsMap = $.map($($element).find('>div'), (div) => div.offsetWidth);
  }

  angular.element($window).on('resize', () => {
    parentWidth = $element[0].offsetWidth;
    _elementsWidth();
    $element.css('left', '0');
  });

  $timeout(() => {
    this.controlls = {
      prevSlide: this.prevSlide,
      nextSlide: this.nextSlide
    };
    _elementsWidth();
  });

  const _calculateOffset = (elem: number): number => {
    let offset = 0;
    for (let i = 0; i < elem; i++) {
      offset += elementsMap[i];
    }
    return offset;
  };

  this.prevSlide = (next = 1): void => {
    if (currentElement > 0) {
      currentElement -= next;
      $element.css('left', _calculateOffset(currentElement) * -1);
    }
  };

  this.nextSlide = (next = 1): void => {
    visibleItem = Math.floor(parentWidth / elementsMap[1]);

    if (currentElement < elementsMap.length - visibleItem) {
      currentElement += next;
      $element.css('left', _calculateOffset(currentElement) * -1);
    } else {
      $element.css('left', '0');
      currentElement = 0;
    }
  };

  return this;
}

const slider = {
  transclude: true,
  bindings: {
    items: '<',
    moveSlides: '<',
    controlls: '='
  },
  controllerAs: 'vm',
  controller: ['$window', '$timeout', '$element', defaultSliderFunction]
};

angular.module('profitelo.components.interface.slider', [
  'pascalprecht.translate'
])
  .component('slider', slider);
