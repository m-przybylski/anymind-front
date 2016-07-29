(function() {

  function SearchResultController() {


    this.model = {
      sortModel: '',
      languagesModel: '',
      categoryModel: '',
      switcherModel: false,
      tagsModel: [],
      minRange: 0,
      maxRange: 100
    }

    this.tagsClick = (id)=> {

    }

    return this
  }


  angular.module('profitelo.controller.search-result', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.components.search.single-consultation',
    'profitelo.directives.search.search-filters',
    'profitelo.directives.pro-footer'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.search-result', {
        url:          '/search-result',
        templateUrl:  'search/search-result.tpl.html',
        controller:   'SearchResultController',
        controllerAs: 'vm',
        data : {
          access : UserRolesProvider.getAccessLevel('public'),
          pageTitle: 'PAGE_TITLE.SEARCH_RESULT'
        }
      })
    })
    .controller('SearchResultController', SearchResultController)

}())