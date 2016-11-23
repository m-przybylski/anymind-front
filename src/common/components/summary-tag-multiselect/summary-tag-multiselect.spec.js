describe('Unit testing: profitelo.components.summary-tag-multiselect', () => {
  return describe('for summaryTagMultiselectComponent >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<summary-tag-multiselect tags="tags" title="title"></summary-tag-multiselect>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.summary-tag-multiselect')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('summaryTagMultiselectComponent', {$element: create(validHTML), $scope: scope}, {})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
