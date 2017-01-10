describe('Unit tests: login>', () => {
  describe('Testing Controller: LoginController', () => {

    var $scope
    var LoginController

    beforeEach(() => {
    angular.mock.module('profitelo.controller.login')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        LoginController = $controller('LoginController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exsist', ()=> {
      expect(!!LoginController).toBe(true)
    })

  })
})