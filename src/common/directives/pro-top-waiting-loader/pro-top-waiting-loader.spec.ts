describe('Unit testing: profitelo.directives.pro-top-waiting-loader', () => {
  return describe('for pro-top-waiting-loader directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-top-waiting-loader></pro-top-waiting-loader>'
    let proTopWaitingLoaderService

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-top-waiting-loader')
    angular.mock.module('profitelo.services.pro-top-waiting-loader-service')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})