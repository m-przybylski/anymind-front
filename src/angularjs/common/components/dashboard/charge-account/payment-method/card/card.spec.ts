import * as angular from 'angular'
import userModule from '../../../../../services/user/user'
import apiModule from 'profitelo-api-ng/api.module'
import {PaymentsApiMock} from 'profitelo-api-ng/api/api'
import cardModule from './card';
import {CardPaymentFormComponentController} from './card.controller';
import {ICardPaymentFormComponentBindings} from './card.component';
import {StateService} from '@uirouter/angularjs'

describe('Unit testing:profitelo.components.dashboard.charge-account.payment-method.card', () => {
  return describe('for cardPaymentForm component >', () => {

    let httpBackend: ng.IHttpBackendService
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: CardPaymentFormComponentController
    let state: StateService

    const validHTML: string = '<card-payment-form amount-method-modal="amountMethodModal"' +
      'payments-links="paymentsLinks" payment-country-id="paymentCountryId"></card-payment-form>'

    function create(html: string, bindings: ICardPaymentFormComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    const bindings: ICardPaymentFormComponentBindings = {
      amountMethodModal: {
        amountModel: {
          cashAmount: {
            amount: '123123',
            currency: 'PLN'
          }
        },
        paymentSystemModel: {
          id: 'asdasd'
        }
      },
      paymentsLinks: [],
      paymentCountryId: 'asd2232323',
      onCardPayment: () => {}
    }

    const userService = {
      getUser: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      // angular.mock.module('templates-module')
      angular.mock.module(apiModule)
      angular.mock.module('profitelo.components.braintree-form')
      angular.mock.module(cardModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, $state: StateService,
              $httpBackend: ng.IHttpBackendService, PaymentsApiMock: PaymentsApiMock, $q: ng.IQService) => {

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))

        rootScope = $rootScope
        compile = $compile
        httpBackend = $httpBackend
        state = $state
        PaymentsApiMock.getDefaultPaymentMethodRoute(200, {card: undefined})

        component = $componentController<CardPaymentFormComponentController, ICardPaymentFormComponentBindings>(
          'cardPaymentForm', {$state: state}, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should call the function on succeed method', () => {
      spyOn(component, 'onCardPayment')
      component.onSucceed()
      expect(component.onCardPayment).toHaveBeenCalled()
    })

    it('should call the function on succeed method', () => {
      spyOn(component, 'onCardPayment')
      component.onSucceed()
      expect(component.onCardPayment).toHaveBeenCalled()
    })

    it('should redirect to the client activities when function on succeed not defined', () => {
      component.onCardPayment = <any>undefined
      spyOn(state, 'go')
      component.onSucceed()
      expect(state.go).toHaveBeenCalledWith('app.dashboard.client.activities')
    })

  })
})