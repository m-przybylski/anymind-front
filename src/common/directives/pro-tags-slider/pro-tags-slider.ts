// TODO should be refactor to component: https://git.contactis.pl/itelo/profitelo/issues/1000
import * as angular from 'angular'
import 'angular-ui-router'
import {Tag} from 'profitelo-api-ng/model/models'
import {IWindowService} from '../../services/window/window.service'
import {IDirective} from 'angular'

function proTagsSlider($window: IWindowService,
                       $state: ng.ui.IStateService,
                       $location: ng.ILocationService,
                       $timeout: ng.ITimeoutService): IDirective {
  function linkFunction(scope: any, element: ng.IRootElementService): void {

    let tagsContainerWidth = element.find('.slider-tag')[0].clientWidth
    let elementsMap: number[] = []
    let currentElement = 0

    scope.slidesContainerOffsetWidth = 0
    scope.leftOffset = {left: 0}

    $timeout(() => {
      scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth
    })

    const _clearSlider = (): void => {
      scope.leftOffset = {left: 0}
      currentElement = 0
      tagsContainerWidth = element.find('.slider-tag')[0].clientWidth
      scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth
    }

    const _calculateOffset = (elem: number): number => {
      let offset = 0
      const margin: number = 8
      for (let i = 0; i < elem; i++) {
        offset = offset + elementsMap[i] + margin
      }
      return offset
    }

    /* istanbul ignore next */
    angular.element($window).on('resize', () => {
      _clearSlider()
    })

    scope.$watch(() => scope.tags, (newValue: Tag[], _oldValue: Tag[]) => {
      if (newValue) {
        elementsMap = $.map($(element).find('.slide-page li'), (li) => li.clientWidth)
      }
    })

    scope.tagAction = (tag: Tag): void => {
      if (tag.id !== $location.search().tagId) {
        scope.onTagClickAction(tag)
        _clearSlider()
      }
    }

    scope.addTagToQueryAndSearch = (tag: string): void => {
      const tags: string[] = $state.params.tags ? $state.params.tags : []
      tags.push(tag)
      $state.go('app.search-result', {tags}, {reload: true})
    }

    scope.prevSlide = (next = 1): void => {
      if (currentElement > 0) {
        currentElement = currentElement - next
        scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth + _calculateOffset(currentElement)
      }
    }

    scope.nextSlide = (next = 1): void => {
      if (currentElement < elementsMap.length - next && tagsContainerWidth < scope.slidesContainerOffsetWidth) {
        currentElement = currentElement + next
        scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth - _calculateOffset(currentElement)
      }
    }

    scope.leftArrowActive = (): boolean => currentElement > 0

    scope.rightArrowActive = (): boolean => tagsContainerWidth < scope.slidesContainerOffsetWidth
  }

  return {
    template: require('./pro-tags-slider.pug')(),
    restrict: 'E',
    replace: true,
    scope: {
      tags: '=?'
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.pro-tags-slider', [
  'ui.router'
])
.directive('proTagsSlider', proTagsSlider)
