import * as angular from 'angular'
import {IMessengerMinimizedComponentBindings} from './minimized'
import {MessengerMinimizedComponentController} from './minimized.controller'
import communicatorModule from '../../communicator'
import {ClientCallService} from '../../call-services/client-call.service'
import {ExpertCallService} from '../../call-services/expert-call.service'
import {CurrentClientCall} from '../../models/current-client-call'
import {CurrentExpertCall} from '../../models/current-expert-call'
import {Message} from 'ratel-sdk-js'

describe('Unit testing: profitelo.components.communicator.messenger.minimized', () => {
  return describe('for messengerMinimized component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: MessengerMinimizedComponentController

    const validHTML = '<minimized></minimized>'

    const bindings: IMessengerMinimizedComponentBindings = {
      onMessageClick: (): void => {
      }
    }

    const clientCallService: ClientCallService = {
      onNewCall: (cb: (call: CurrentClientCall) => void): void => {
        cb(<CurrentClientCall>{
          getMessageRoom: () => <any> ({onMessage: (cb: (message: Message) => void) => {
            cb(<Message>{})
          }})
        })
      }
    } as ClientCallService

    const expertCallService: ExpertCallService = {
      onNewCall: (_cb: (call: CurrentExpertCall) => void): void => {
      }
    } as ExpertCallService

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('clientCallService', clientCallService)
      $provide.value('expertCallService', expertCallService)
    }))

    function create(html: string, bindings: IMessengerMinimizedComponentBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.communicator.messenger.minimized')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        const injectors = {
          $$timeout: $timeout,
          expertCallService: expertCallService,
          clientCallService: clientCallService
        }

        component = $componentController<MessengerMinimizedComponentController, IMessengerMinimizedComponentBindings>(
          'messengerMinimized', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(component).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

  })
})
