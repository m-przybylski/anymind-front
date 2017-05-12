import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayPalAccountDto, PayoutMethodsDto} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../common/services/modals/modals.service'

export class DashboardSettingsPayoutsController implements ng.IController {
  public isAnyPayoutMethod: boolean = false
  public payPalAccount?: PayPalAccountDto

  /* @ngInject */
  constructor(private modalsService: ModalsService, private $state: ng.ui.IStateService,
              payoutsMethods: PayoutMethodsDto, private PayoutsApi: PayoutsApi) {

    if (payoutsMethods && payoutsMethods.payPalAccount) {
      this.isAnyPayoutMethod = true
      this.payPalAccount = payoutsMethods.payPalAccount
    }
  }

  public deletePaymentMethod = (): void => {
    this.PayoutsApi.deletePayPalAccountPayoutMethodRoute().then(() => {
      this.$state.reload()
    }, (error) => {
      throw new Error('Can Not delete payout methods: ' + error)
    })
  }

  public addPayoutsMethod = (): void => {
    this.modalsService.createPayoutsMethodControllerModal(this.onModalClose)
  }

  private onModalClose = (): void => {
    this.$state.reload()
  }
}
