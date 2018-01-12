import * as angular from 'angular'
import phoneSettingsModule from './phone-settings'
import {PhoneSettingsService} from './phone-settings.service'

describe('Unit testing: profitelo.components.dashboard.settings.modals.general.phone-settings ', () => {
  describe('for profitelo.components.dashboard.settings.modals.general.phone-settings', () => {

    let phoneSettingsService: PhoneSettingsService
    let rootScope: angular.IRootScopeService

    const phoneNumber: string = '500490423'

    beforeEach(() => {
      angular.mock.module(phoneSettingsModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      phoneSettingsService =
        $injector.get<PhoneSettingsService>('phoneSettingsService')
      rootScope = $rootScope
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should set new number and show pin form', () => {
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.addNewNumber).toBeTruthy();
    })

    it('should set status button as disabled when promise error', () => {
      const thirtySeconds: number = 20000
      jasmine.clock().install()
      jasmine.clock().mockDate(new Date())
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.setButtonDisabled(phoneNumber)).toBeTruthy()
      jasmine.clock().tick(thirtySeconds)
      phoneSettingsService.addNewNumber(phoneNumber)
      expect(phoneSettingsService.setButtonDisabled(phoneNumber)).toBeFalsy()
    })

    it('should check if number valid', () => {
      phoneSettingsService.setNumberValid(phoneNumber)
      expect(phoneSettingsService.setNumberValid(phoneNumber)).toBeTruthy()
    })

    it('should check if number invalid', () => {
      const incorrectPhoneNumber = '500123'
      phoneSettingsService.setNumberValid(incorrectPhoneNumber)
      expect(phoneSettingsService.setNumberValid(incorrectPhoneNumber)).toBeFalsy()
    })
  })
})