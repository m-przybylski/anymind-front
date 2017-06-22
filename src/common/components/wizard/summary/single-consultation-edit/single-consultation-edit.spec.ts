import * as angular from 'angular'
import singleConsultationEditModule from './single-consultation-edit'
import {SingleConsultationEditComponentController} from './single-consultation-edit.controller'

describe('Unit testing: profitelo.components.wizard.single-consultation-edit', () => {
  return describe('for single-consultation-edit component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: SingleConsultationEditComponentController

    beforeEach(() => {
      angular.mock.module(singleConsultationEditModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        component = $componentController<SingleConsultationEditComponentController, {}>('singleConsultationEdit', {}, {
        })

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should remove consultation', () => {
      component.service = {
        name: 'name',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        tags: [{
          name: 'tag-1'
        }],
        isOwnerEmployee: false
      }
      component.onRemove = () => {}
      spyOn(component, 'onRemove')
      component.removeConsultation()
      expect(component.onRemove).toHaveBeenCalledWith(component.service)
    })

    it('should edit consultation', () => {
      component.service = {
        name: 'name',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        tags: [{
          name: 'tag-1'
        }],
        isOwnerEmployee: false
      }
      component.onEdit = () => {}
      spyOn(component, 'onEdit')
      component.editConsultation()
      expect(component.onEdit).toHaveBeenCalledWith(component.service)
    })

    it('should add employee email', inject(($componentController: ng.IComponentControllerService)  => {
      component.employeeList = []
      component = $componentController<SingleConsultationEditComponentController, {}>('singleConsultationEdit', {}, {
        service: {
          name: 'name',
          price: {
            amount: 123,
            currency: 'PLN'
          },
          tags: [{
            name: 'tag-1'
          }],
          isOwnerEmployee: false,
          invitations: [{
            email: 'some@email.com'
          }]
        }
      })
      component.$onInit()
      expect(component.employeeList.length).toBe(1)
    }))

    it('should add employee msisdn', inject(($componentController: ng.IComponentControllerService)  => {
      component.employeeList = []
      component = $componentController<SingleConsultationEditComponentController, {}>('singleConsultationEdit', {}, {
        service: {
          name: 'name',
          price: {
            amount: 123,
            currency: 'PLN'
          },
          tags: [{
            name: 'tag-1'
          }],
          isOwnerEmployee: false,
          invitations: [{
            msisdn: 'some@email.com'
          }]
        }
      })
      component.$onInit()
      expect(component.employeeList.length).toBe(1)
    }))

    it('should not add employee', inject(($componentController: ng.IComponentControllerService)  => {
      component.employeeList = []
      component = $componentController<SingleConsultationEditComponentController, {}>('singleConsultationEdit', {}, {
        service: {
          name: 'name',
          price: {
            amount: 123,
            currency: 'PLN'
          },
          tags: [{
            name: 'tag-1'
          }],
          isOwnerEmployee: false
        }
      })
      component.$onInit()
      expect(component.employeeList.length).toBe(0)
    }))

  })
})
