import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile, MoneyDto, WizardService, WizardTag} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../common/services/user/user.service'
import {ServiceInvitation} from '../../../common/models/ServiceInvitation'
import * as _ from 'lodash'
import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {IFilterService} from '../../../common/services/filter/filter.service'

export interface IConsultationStateParams extends ng.ui.IStateParamsService {
  service: WizardService
}

interface ILanguagesList {
  name: string,
  value: string
}

export class ConsultationController implements ng.IController {
  public isStepRequired: boolean = true
  public consultationsMock: string[]
  public priceRegexp: RegExp
  public currency: string
  public nameInputValue: string
  public tagsInputValue: string[] = []
  public priceAmountInputValue: string = '1,00'
  public invitationsInputValue: string[] = []
  public isOwnerEmployee: boolean = false
  public languagesList: ILanguagesList[]
  public languageInputValue: ILanguagesList
  public descriptionInputValue: string

  public isCompany: boolean
  public isSubmitted: boolean = false
  private isExpert: boolean
  private currentEditServiceIndex: number = -1
  private moneyDivider: number
  private static readonly minValidNameLength: number = 5
  private static readonly minValidDescriptionLength: number = 50
  public isRegExpPriceInputValid: boolean = true

  /* @ngInject */
  constructor(private $filter: IFilterService,
              private $state: ng.ui.IStateService,
              private $stateParams: IConsultationStateParams,
              private WizardApi: WizardApi,
              private userService: UserService,
              private CommonConfig: CommonConfig,
              private wizardProfile: GetWizardProfile,
              private CommonSettingsService: CommonSettingsService) {

    const languages: {
      shortcut: string,
      name: string,
      'native-name': string
    }[] = CommonConfig.getAllData().config['supported-languages']

    this.languagesList = languages.map((lng) =>
      ({
        name: (this.$filter('translate')(this.$filter('normalizeTranslationKey')(('LANGUAGE.' + lng.shortcut)))),
        value: lng.shortcut
      }))

    this.moneyDivider = this.CommonConfig.getAllData().config.moneyDivider

    if (wizardProfile) {
      this.isCompany = wizardProfile.isCompany
      this.isExpert = wizardProfile.isExpert
      if (this.isExpert) {
        this.isOwnerEmployee = true
      }
    }


    this.consultationsMock = [
      'Tag-1',
      'Tag-2',
      'Tag-3'
    ]
  }

  $onInit(): void {
    this.checkIsPriceInputValid()
    this.priceRegexp = this.CommonSettingsService.localSettings.pricePattern

    this.userService.getUser().then((response) => {
      this.currency = response.currency
    })

    if (this.$stateParams.service) {
      this.nameInputValue = this.$stateParams.service.name
      this.isOwnerEmployee = this.$stateParams.service.isOwnerEmployee
      this.priceAmountInputValue = (this.$stateParams.service.price.amount / this.moneyDivider).toString()
      this.$stateParams.service.tags.forEach((tag) => {
        this.tagsInputValue.push(tag.name)
      })
      this.languageInputValue = {
        name: (this.$filter('translate')
        (this.$filter('normalizeTranslationKey')(('LANGUAGE.' + this.$stateParams.service.language)))),
        value: this.$stateParams.service.language
      }
      this.descriptionInputValue = this.$stateParams.service.description
      if (this.$stateParams.service.invitations) {
        this.$stateParams.service.invitations.forEach((employee) => {
          if (employee.email) {
            this.invitationsInputValue.push(employee.email)
          } else if (employee.msisdn) {
            this.invitationsInputValue.push(employee.msisdn)
          }
        })
      }
      if (this.wizardProfile && this.wizardProfile.services)
        this.currentEditServiceIndex = _.findIndex(this.wizardProfile.services, (service) =>
          service.name === this.$stateParams.service.name)
    }
  }

  public saveStepsOnExpertPath = (): void => {
    if (this.isExpert && !this.isCompany) {
      this.saveConsultation()
    }
  }

  public saveConsultation = (): void => {
    if (this.checkIsFormValid() && this.wizardProfile) {
      const priceModel: MoneyDto = {
        amount: Number(this.priceAmountInputValue.replace(',', '.')) * this.moneyDivider,
        currency: this.currency
      }
      const tags: WizardTag[] = []
      this.tagsInputValue.forEach((tag) => {
        tags.push({
          name: tag
        })
      })

      const invitations: ServiceInvitation[] = []
      this.invitationsInputValue.forEach((emailOrPhone) => {
        if (emailOrPhone.indexOf('@') > -1) {
          invitations.push({
            email: emailOrPhone
          })
        } else {
          invitations.push({
            msisdn: emailOrPhone
          })
        }
      })
      const serviceModel: WizardService = {
        tags,
        invitations,
        language: this.languageInputValue.value,
        description: this.descriptionInputValue,
        name: this.nameInputValue,
        price: priceModel,
        isOwnerEmployee: this.isOwnerEmployee
      }
      if (this.wizardProfile.services && !this.$stateParams.service) {
        this.wizardProfile.services.push(serviceModel)
      } else if (this.wizardProfile.services && this.wizardProfile.services.length < 1) {
        this.wizardProfile.services = [serviceModel]
      } else if (this.wizardProfile.services && this.$stateParams.service && this.currentEditServiceIndex > -1) {
        this.wizardProfile.services[this.currentEditServiceIndex] = serviceModel
      }
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then(() => {
        this.$state.go('app.wizard.summary')
      })
    } else {
      this.isSubmitted = true
    }
  }

  public onGoBack = (): void => {
    this.$state.go('app.wizard.summary')
  }

  public onPriceChange = (consultationCostModel: string): void => {
    const amount = Number(consultationCostModel.replace(',', '.'))
    this.isRegExpPriceInputValid = this.isRegExpPriceValid(amount)
  }

  private isRegExpPriceValid = (priceValue: number): boolean =>
    (priceValue && this.priceRegexp.test(priceValue.toString())) || priceValue > 0

  public checkIsNameInputValid = (): boolean =>
    !!(this.nameInputValue && this.nameInputValue.length >= ConsultationController.minValidNameLength)

  public checkIsTagsInputValid = (): boolean => this.tagsInputValue && this.tagsInputValue.length > 0

  public checkIsLanguageInputValid = (): boolean => this.languageInputValue && this.languageInputValue.name.length > 0

  public checkIsDescriptionInputValid = (): boolean => typeof this.descriptionInputValue === 'string'
    && this.descriptionInputValue.length >= ConsultationController.minValidDescriptionLength

  public checkIsEmployeesInputValid = (): boolean =>
    this.invitationsInputValue && this.invitationsInputValue.length > 0 || this.isOwnerEmployee

  public checkIsFormValid = (): boolean =>
    this.checkIsNameInputValid() && this.checkIsTagsInputValid() && this.checkIsPriceInputValid()
    && this.checkIsEmployeesInputValid() && this.checkIsLanguageInputValid() && this.checkIsDescriptionInputValid()

  public checkIsPriceButtonDisabled = (): boolean => !this.isCompany || this.checkIsPriceInputValid()

  public checkIsPriceInputValid = (): boolean =>
    !!(this.priceAmountInputValue && this.priceAmountInputValue.length > 0)

}
