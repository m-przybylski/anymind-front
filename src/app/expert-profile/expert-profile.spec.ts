describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController
    let _scope

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.expert-profile')
    angular.mock.module('profitelo.services.recommended-profiles-service')

      inject(($rootScope, $controller, $timeout, $q, $stateParams, _smoothScrolling_, _recommendedProfilesServices_) => {

        _scope = $rootScope.$new()

        spyOn(_recommendedProfilesServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          smoothScrolling: _smoothScrolling_,
          expertOrganizations: [],
          recommendedProfilesServices: _recommendedProfilesServices_,
          expertProfile: {type: '', profile: {expertDetails: {}}}
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })
  })
})