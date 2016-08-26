(function() {

  /* @ngInject */
  function defaultSliderFunction($scope, $window, $timeout, $element) {
    let currentWidth = 0
    let elementsMap = []
    let allElementsMap = []
    let currentElement = 0
    let parentWidth = $element[0].offsetWidth
    let visibleItem = null

    angular.element($window).on('resize', ()=> {
      _elementsWidth()
      $element.css('left', '0')
    })

    $timeout(() => {
      this.controlls = {
        prevSlide: this.prevSlide,
        nextSlide: this.nextSlide
      }
    })

    function _elementsWidth() {
      elementsMap = $.map($($element).find('>div'), (div)=>{
        return div.offsetWidth
      })
    }

    $timeout(()=>{
      _elementsWidth()
    })

    const _calculateOffset = (elem) => {
      let offset = 0
      for (let i = 0; i < elem; i++) {
        offset += elementsMap[i]
      }
      return offset
    }

    this.prevSlide = (next=1) => {
      if (currentElement > 0) {
        currentElement -= next
        $element.css('left', _calculateOffset(currentElement) * -1)
      }
    }

    this.nextSlide = (next=1) => {
      visibleItem = Math.floor(parentWidth / elementsMap[1])

      if (currentElement < elementsMap.length - visibleItem) {
        currentElement += next
        $element.css('left', _calculateOffset(currentElement) * -1)
      }
      else {
        $element.css('left', '0')
        currentElement = 0
      }
    }

    return this
  }

  let slider = {
    transclude: true,
    bindings: {
      items: '<',
      moveSlides: '<',
      controlls: '='
    },
    controllerAs: 'vm',
    controller: defaultSliderFunction
  }


  angular.module('profitelo.components.interface.slider', [
    'pascalprecht.translate'
  ])
    .component('slider', slider)

}())
