import * as angular from 'angular'
import companyWizardModule from './company'
import {GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {CompanyController} from './company.controller'

describe('Testing Controller: CompanyController', () => {

  let CompanyController: CompanyController
  let httpBackend: ng.IHttpBackendService

  const wizardProfile: GetWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
    $provide.value('apiUrl', 'awesomeURL/')
  }))

  beforeEach(() => {
    angular.mock.module(companyWizardModule)

    inject(($controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService, WizardApi: WizardApi) => {
      httpBackend = $httpBackend
      CompanyController = $controller<CompanyController>('companyController', {
        wizardProfile: wizardProfile,
        WizardApi: WizardApi
      })
    })
  })

  it('should exists', () => {
    expect(!!CompanyController).toBe(true)
  })

  it('should submit form', () => {
    CompanyController.goToSummary()
    expect(CompanyController.isSubmitted).toBe(true)
  })
})