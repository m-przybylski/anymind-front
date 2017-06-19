import {ISingleConsultationEditComponentBindings} from './single-consultation-edit'
import {WizardService, WizardTag, MoneyDto} from 'profitelo-api-ng/model/models'
import {ServiceInvitation} from '../../../../models/ServiceInvitation'

export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {

  public service: WizardService
  public tagsList: WizardTag[]
  public employeeList: ServiceInvitation[]
  public name: string
  public price: MoneyDto
  public isEmployee: boolean
  public onRemove: (service: WizardService) => void
  public onEdit: (service: WizardService) => void

  /* @ngInject */
  constructor() {
  }

  $onInit() {
    this.isEmployee = !!(this.service.invitations && this.service.invitations.length > 0)
    this.tagsList = this.service.tags
    this.employeeList = []
    if (this.service.invitations) {
      this.service.invitations.forEach((invitation) => {
        if (invitation.email) {
          this.employeeList.push(invitation.email)
        } else if (invitation.msisdn) {
          this.employeeList.push(invitation.msisdn)
        }
      })
    }
    this.name = this.service.name
    this.price = this.service.price
  }

  public removeConsultation = () => {
    if (this.onRemove && typeof this.onRemove === 'function') {
      this.onRemove(this.service)
    }
  }

  public editConsultation = () => {
    if (this.onEdit && typeof this.onEdit === 'function') {
      this.onEdit(this.service)
    }
  }

}