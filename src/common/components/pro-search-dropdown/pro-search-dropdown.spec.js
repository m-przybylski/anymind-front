describe('Unit testing:profitelo.components.pro-search-dropdown', () => {
  return describe('for pro-search-dropdown >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<pro-search-dropdown></pro-search-dropdown>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.pro-search-dropdown')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('proSearchDropdownController', null, {})

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

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
//describe('profitelo.directives.pro-search-dropdown', () => {
//  describe('for pro-pro-search-dropdown directive >', () => {
//
//    let scope = null
//    let rootScope
//    let compile = null
//    let validHTML = '<pro-pro-search-dropdown></pro-pro-search-dropdown>'
//    let httpBackend
//    let SearchApiDef
//    let CategoryApiDef
//
//    beforeEach(module(($provide) => {
//      $provide.value('apiUrl', '')
//      $provide.value('translateFilter', (x) => { return x })
//    }))
//
//    beforeEach(() => {
//      module('templates-module')
//      module('profitelo.directives.pro-search-dropdown')
//      module('profitelo.swaggerResources.definitions')
//
//      inject(($rootScope, $compile, $injector) => {
//        rootScope = $rootScope.$new()
//        compile = $compile
//
//        SearchApiDef = $injector.get('SearchApiDef')
//        CategoryApiDef = $injector.get('CategoryApiDef')
//
//        httpBackend = $injector.get('$httpBackend')
//      })
//    })
//
//    function create(html) {
//      scope = rootScope.$new()
//
//      let elem = angular.element(html)
//      let compiledElement = compile(elem)(scope)
//      scope.$digest()
//      return compiledElement
//    }
//
//    it('should have a dummy test', () => {
//      expect(true).toBeTruthy()
//    })
//
//    it('should compile the directive', () => {
//      let el = create(validHTML)
//      expect(el.html()).toBeDefined(true)
//    })
//
//    it('should watch query', () => {
//      let el = create(validHTML)
//      let isoScope = el.isolateScope()
//
//      httpBackend.whenRoute(SearchApiDef.searchSuggestions.method, SearchApiDef.searchSuggestions.url).respond(200, {})
//      httpBackend.when(CategoryApiDef.listCategories.method, CategoryApiDef.listCategories.url).respond(200, [])
//
//      isoScope.q = 'foo'
//      isoScope.$digest()
//
//      httpBackend.flush()
//
//      expect(isoScope.suggestions.primary).toEqual('foo test')
//    })
//  })
//})
