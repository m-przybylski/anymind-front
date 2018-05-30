import * as angular from 'angular'
import {NavbarHelpComponentController} from './navbar-help.controller'
import navbarHelpModule from './navbar-help'
import {INavbarHelpComponentBindings} from './navbar-help'
import {HelpdeskService} from '../../../services/helpdesk/helpdesk.service'
import * as _ from 'lodash'

describe('Unit testing: navbarHelp', () => {
  return describe('for navbarHelp component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavbarHelpComponentController
    let bindings: INavbarHelpComponentBindings
    let helpdeskService: HelpdeskService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService): void => {
      $provide.value('helpdeskService', helpdeskService)
    }))
    beforeEach(() => {

      angular.mock.module(navbarHelpModule)

      inject(($rootScope: ng.IRootScopeService,
              $compile: ng.ICompileService,
              _helpdeskService_: HelpdeskService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile
        helpdeskService = _helpdeskService_
        bindings = {
          onClick: (): void => {}
        }

        const injectors = {
          helpdeskService: helpdeskService
        }

        spyOn(_, 'debounce').and.callFake( (func: () => void) => function () { func.apply(this, arguments) })
        component = $componentController<NavbarHelpComponentController, INavbarHelpComponentBindings>(
          'navbarHelp', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should search zendesk articles', inject(($q: ng.IQService) => {
      spyOn(helpdeskService, 'searchArticles').and.callFake(() => $q.resolve({}))
      component.helpSearchQuery = '1234'
      component.onHelpSearchInputChange()
      expect(helpdeskService.searchArticles).toHaveBeenCalledWith(component.helpSearchQuery )

    }))

    it('should call onClick function', inject(() => {
      spyOn(component, 'onClick')
      component.buttonCallback()
      expect(component.onClick).toHaveBeenCalled()
    }))

  })
})
