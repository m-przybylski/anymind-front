describe('Unit testing: profitelo.components.dashboard.charge-account.choose-amount-charge', () => {
  return describe('for chooseAmountCharge component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let bindings
    let component
    let validHTML = '<choose-amount-charge data-title="DASHBOARD.CHARGE_ACCOUNT.CHOOSE_AMMOUNT_CHARGE" data-amounts="{paymentOptions: {}, ' +
      'minimalAmounts: {}}" data-amount-model="{cashAmount: null,amount: null}" data-scroll-handler="{}"></choose-amount-charge>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(module(($provide) => {
      $provide.value('translateFilter', (x) => { return x })
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.charge-account.choose-amount-charge')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        amountModel: {
          cashAmount: {
            amount: '123'
          }
        }
      }

      component = componentController('chooseAmountCharge', null, bindings)

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

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })



  })
})