(function() {
  /* @ngInject */
  function showMoreTagsController($element, $timeout)  {

    let elementsMap = []
    let containerWidth = $element.width()
    this.showTags = false
    this.showTagClass = false
    let isShowed = false
    let showMoreBtn = $($element).find('.showMoreTagsBtn').width()

    function findTags(selector = 'li') {
      return $.map($($element).find(selector), (li)=>{
        return li
      })
    }

    this.showMoreTags = () => {
      this.showTagClass = !this.showTagClass

      if (!isShowed) {
        elementsMap = findTags('li.hidden')

        for (var i=0; i<elementsMap.length; i++) {
          elementsMap[i].classList.remove('hidden')
        }
        isShowed = !isShowed

      } else {
        elementsMap = findTags('li.tohidden')

        for (i=0; i<elementsMap.length; i++) {
          elementsMap[i].classList.add('hidden')
        }
        isShowed = !isShowed
      }
    }

    $timeout(()=>{
      elementsMap = findTags()

      let sum = 0
      let count = 0

      for (var i=0; i<elementsMap.length; i++) {
        sum += elementsMap[i].clientWidth

        if (sum >= (containerWidth - showMoreBtn)) {
          count += 1
          if (count > 1) {
            elementsMap[i-1].classList.add('tohidden', 'hidden')
          }
        }
      }

      if (sum > (containerWidth)) {
        this.showTags = !this.showTags
      }
    })

    return this
  }

  let proSummaryTag = {
    transclude: true,
    templateUrl:    'components/pro-summary-tag/pro-summary-tag.tpl.html',
    bindings: {
      tags: '<',
      title: '@'
    },
    controller: showMoreTagsController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-summary-tag', [
    'pascalprecht.translate'
  ])
  .component('proSummaryTag', proSummaryTag)

}())
