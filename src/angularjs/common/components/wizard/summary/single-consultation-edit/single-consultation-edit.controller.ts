import {ISingleConsultationEditComponentBindings} from './single-consultation-edit'
import {WizardService, WizardTag, MoneyDto} from 'profitelo-api-ng/model/models'
import {TranslatorService} from '../../../../services/translator/translator.service'

export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {

  public service: WizardService
  public tagsList: WizardTag[]
  public employeeList: string[]
  public name: string
  public price: MoneyDto
  public onRemove: (service: WizardService) => void
  public onEdit: (service: WizardService) => void
  public isOwnerEmployee: boolean = false
  public isCompany: boolean
  public language: string
  public description: string

  static $inject = ['translatorService'];

    constructor(private translatorService: TranslatorService) {
  }

  $onInit(): void {
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
    this.isOwnerEmployee = this.service.isOwnerEmployee
    this.language = this.translatorService.translate('LANGUAGE.' + this.service.language)
    this.description = this.service.description
  }

  public removeConsultation = (): void => {
    const confirmWindowMessage: string =
      this.translatorService.translate('WIZARD.SUMMARY.DELETE_SERVICE.BUTTON.CONFIRMATION_MESSAGE')
    if (this.checkIsOnRemoveExist() && confirm(confirmWindowMessage)) {
      this.onRemove(this.service)
    }
  }

  public editConsultation = (): void => {
    if (this.checkIsOnEditExist()) {
      this.onEdit(this.service)
    }
  }

  public checkIsOnRemoveExist = (): boolean => this.onRemove && typeof this.onRemove === 'function'

  public checkIsOnEditExist = (): boolean => this.onEdit && typeof this.onEdit === 'function'

}
