(function() {
  function proTopNavbar($location, $filter, $window, searchService) {

    function linkFunction(scope, elem, attrs) {

      scope.isHide = false
      scope.isDashboard = $location.url().indexOf('dashboard') !== -1
      scope.hamburgerClass = scope.sidebarStatus ===  true ? 'active-btn' : 'disactive-btn'
      scope.accounts = ['Konto Klienta', 'Konto Eksperta', 'Firma']
      scope.menuElements = [
        {
          label: $filter('translate')('NAVIGATION.MEET_US'),
          link: 'app.home'
        },
        {
          label: $filter('translate')('NAVIGATION.HOW_IT_WORKS'),
          link: 'app.home'
        },
        {
          label: $filter('translate')('NAVIGATION.FOR_EXPERTS'),
          link: 'app.home'
        },
        {
          label:  $filter('translate')('NAVIGATION.HELP'),
          link: 'app.home'
        }
      ]

      scope.logout = ()=> {
        scope.logoutAction()
      }
      /* istanbul ignore next */
      angular.element($window).on('resize', (window)=> {
        if (angular.isDefined(scope.sidebarStatus)) {
          scope.hamburgerClass = scope.sidebarStatus ===  true ? 'active-btn' : 'disactive-btn'
          scope.$digest()
        }
      })
      
      scope.sidebarAction = ()=> {
        if (typeof scope.sidebarHandler !== 'undefined') {
          scope.hamburgerClass = scope.hamburgerClass ===  'disactive-btn' ? 'active-btn' : 'disactive-btn'
          scope.sidebarHandler()
        }
      }
      
      scope.setShowSearch = () => {
        scope.showSearch = scope.showSearch !== true
      }

      searchService.onQueryParamsChange(scope, (params) => {
        scope.searchModel = params.q
      })

      scope.$watch(() => {
        return scope.searchModel
      }, (newValue) => {
        searchService.setSearchQueryParams({q: newValue})
      })

    }

    return {
      templateUrl: 'directives/pro-top-navbar/pro-top-navbar.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        showSearch: '=?',
        isHide: '=?',
        sidebarStatus: '=?',
        logoutAction: '=?',
        sidebarHandler: '=?',
        isExpert: '=?'
      }

    }

  }

  angular.module('profitelo.directives.pro-top-navbar', [
    'pascalprecht.translate',
    'profitelo.services.search'
  ])
  .directive('proTopNavbar', proTopNavbar)

}())
