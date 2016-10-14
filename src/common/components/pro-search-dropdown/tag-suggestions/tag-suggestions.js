(function() {
  let tagSuggestions = {
    transclude: true,
    templateUrl: 'components/pro-search-dropdown/tag-suggestions/tag-suggestions.tpl.html',
    bindings: {
      tags: '<',
      searchModel: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-search-dropdown.tag-suggestions', [
    'profitelo.filters.search-bold-filter'
  ])
    .component('tagSuggestions', tagSuggestions)
}())
