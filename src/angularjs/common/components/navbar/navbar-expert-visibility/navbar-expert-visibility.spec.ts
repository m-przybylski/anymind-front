import * as angular from 'angular'
import {NavbarExpertVisibilityComponentController} from './navbar-expert-visibility.controller'
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {IExpertPresenceUpdate, NavbarExpertVisibilityService} from './navbar-expert-visibility.service'
import navbarExperetVisibilityModule from './navbar-expert-visibility'
import profiteloWebsocketModule from '../../../services/profitelo-websocket/profitelo-websocket'
import SpyObj = jasmine.SpyObj
import {GetExpertVisibility} from 'profitelo-api-ng/model/models'
import {PresenceApiMock} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'

describe('Unit testing: navbar-expert-visibility', () => {
  return describe('for navbar-expert-visibility component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarExpertVisibilityComponentController
    const validHTML =
      '<navbar-expert-visibility></navbar-expert-visibility>'

    let injectors = {}
    let timeout: ng.ITimeoutService

    const navbarExpertVisibilityService: SpyObj<NavbarExpertVisibilityService> =
      jasmine.createSpyObj<NavbarExpertVisibilityService>('navbarExpertVisibilityService', [
        'setExpertVisibile', 'setExpertInvisibile', 'getExpertVisibility',
        'onVisibilityUpdate', 'onGetExpertisibilityReconnect'
      ])

    function create(html: string): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(() => {
      angular.mock.module(navbarExperetVisibilityModule)
      angular.mock.module(profiteloWebsocketModule)

      inject(($compile: ng.ICompileService,
              $rootScope: ng.IRootScopeService,
              $timeout: ng.ITimeoutService,
              $componentController: ng.IComponentControllerService,
              profiteloWebsocket: ProfiteloWebsocketService,
              PresenceApiMock: PresenceApiMock) => {

        PresenceApiMock.expertVisibilityRoute(200, undefined)

        rootScope = $rootScope
        compile = $compile
        timeout = $timeout

        injectors = {
          $element: create(validHTML),
          profiteloWebsocket,
          navbarExpertVisibilityService
        }

        component = $componentController<NavbarExpertVisibilityComponentController, {}>(
          'navbarExpertVisibility', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should open modal', () => {
      component.toggleButton()
      expect(component.isOpen).toBe(true)
    })

    it('should open and close modal', () => {
      component.toggleButton()
      component.toggleButton()
      expect(component.isOpen).toBe(false)
    })

    it('should set visible visibility on init',
      inject(($componentController: ng.IComponentControllerService, $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      const res: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(res))
      component.$onInit()
      rootScope.$apply()
      expect(component.isVisible).toBe(true)
      expect(component.radioModel).toEqual(res.visibility)
      expect(component.isLoading).toBe(false)
    }))

    it('should set visibility when promise reject on init',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.reject())
      component.$onInit()
      rootScope.$apply()
      timeout.flush()
      expect(component.isVisible).toBe(undefined)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
      expect(navbarExpertVisibilityService.getExpertVisibility).toHaveBeenCalled()
      expect(component.isLoading).toBe(true)
    }))

    it('should set invisible visibility on init',
      inject(($componentController: ng.IComponentControllerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      const res: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(res))
      component.$onInit()
      rootScope.$apply()
      expect(component.isVisible).toBe(false)
      expect(component.isLoading).toBe(false)
      expect(component.radioModel).toEqual(res.visibility)
    }))

    it('should set expert visibility when error on init',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.reject())
      component.$onInit()
      rootScope.$apply()
      expect(component.isVisible).toBe(undefined)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
      expect(component.isLoading).toBe(true)
    }))

    it('should set visibility on service visibility update',
      inject(($componentController: ng.IComponentControllerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      const res: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(res))

      navbarExpertVisibilityService.onVisibilityUpdate.and.callFake(
        (callback: (data: IExpertPresenceUpdate) => void) =>
          callback({status: GetExpertVisibility.VisibilityEnum.Visible})
      )

      component.$onInit()
      expect(component.isVisible).toBe(true)
      expect(component.radioModel).toBe(GetExpertVisibility.VisibilityEnum.Visible)
    }))

    it('should open and close dropdown by click on document',
      inject(($document: ng.IDocumentService) => {
      const el = create(validHTML)
      const controller = el.controller('navbar-expert-visibility')
      const isoScope: any = el.isolateScope()
      controller.isLoading = false
      isoScope.$apply()
      expect(controller.isOpen).toBe(false)

      el.find('.btn-dropdown-header').triggerHandler('click')
      expect(controller.isOpen).toBe(true)

      $document.trigger('click')
      $document.bind(event)
      rootScope.$apply()
      expect(controller.isOpen).toBe(false)
    }))

    it('should set visibility on Visible',
      inject(($componentController: ng.IComponentControllerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})

      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      const currentVisibility = component.isVisible
      const res: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      navbarExpertVisibilityService.setExpertVisibile.and.callFake(() => $q.resolve({res}))

      component.selectVisibleOption()
      expect(component.isVisibilityPending).toBe(true)
      rootScope.$apply()

      expect(component.isVisible).toBe(true)
      expect(component.isVisibilityPending).toBe(false)
      expect(component.isVisible).not.toEqual(currentVisibility)
      expect(component.isVisibilityPending).toBe(false)
      expect(component.radioModel).toEqual(res.visibility)
    }))

    it('should set visibility to visible if setExpertVisibile was rejected',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})
      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.setExpertVisibile.and.callFake(() => $q.reject({}))
      component.selectVisibleOption()
      rootScope.$apply()

      expect(component.isVisible).toEqual(false)
      expect(component.radioModel).toEqual(GetExpertVisibility.VisibilityEnum.Invisible)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    }))

    it('should set visibility to visible if promise was rejected and visibility was visible',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})
      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.setExpertVisibile.and.callFake(() => $q.reject({}))
      component.selectVisibleOption()
      rootScope.$apply()

      expect(component.isVisible).toEqual(true)
      expect(component.radioModel).toEqual(GetExpertVisibility.VisibilityEnum.Visible)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    }))

    it('should set visibility on Invisible',
      inject(($componentController: ng.IComponentControllerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})
      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      const currentVisibility = component.isVisible

      const res: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.setExpertInvisibile.and.callFake(() => $q.resolve({res}))

      component.selectInvisibleOption()
      expect(component.isVisibilityPending).toBe(true)

      rootScope.$apply()
      expect(component.isVisible).toBe(false)
      expect(component.isVisibilityPending).toBe(false)
      expect(component.isVisible).toEqual(currentVisibility)
      expect(component.radioModel).toEqual(res.visibility)
      expect(component.isLoading).toBe(false)
    }))

    it('should set visibility to invisible if promise was rejected and visibility was visible.',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})
      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Visible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.setExpertInvisibile.and.callFake(() => $q.reject({}))
      component.selectInvisibleOption()
      rootScope.$apply()

      expect(component.isVisible).toEqual(true)
      expect(component.radioModel).toEqual(GetExpertVisibility.VisibilityEnum.Visible)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    }))

    it('should set visibility to invisible if promise was rejected and visibility was invisible',
      inject(($componentController: ng.IComponentControllerService,
              errorHandler: ErrorHandlerService,
              $q: ng.IQService) => {
      component = $componentController<NavbarExpertVisibilityComponentController, {}>(
        'navbarExpertVisibility', injectors, {})
      const resOnInit: GetExpertVisibility = {visibility: GetExpertVisibility.VisibilityEnum.Invisible}
      navbarExpertVisibilityService.getExpertVisibility.and.callFake(() => $q.resolve(resOnInit))
      component.$onInit()
      rootScope.$apply()

      spyOn(errorHandler, 'handleServerError')
      navbarExpertVisibilityService.setExpertInvisibile.and.callFake(() => $q.reject({}))
      component.selectInvisibleOption()
      rootScope.$apply()

      expect(component.isVisible).toEqual(false)
      expect(component.radioModel).toEqual(GetExpertVisibility.VisibilityEnum.Invisible)
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    }))
  })
})