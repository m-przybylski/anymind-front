import * as angular from 'angular'
import '../../../../../../components/braintree-form/braintree-form'
import '../../../../../../components/interface/preloader/preloader'
import '../../../../../../directives/interface/scrollable/scrollable'

export interface IAddPaymentMethodControllerScope extends ng.IScope {
  callback: () => void
}

export class AddPaymentMethodController implements ng.IController {

  public isNavbar: boolean = true
  public isFullscreen: boolean = true
  public onBraintreeFormLoad: boolean = false

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public onLoad = () => {
    this.onBraintreeFormLoad = true
  }

  public onFormSucceed = () => {
    this.$scope.callback()
    this.$uibModalInstance.dismiss('cancel')
  }
  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IAddPaymentMethodControllerScope) {

  }
}

angular.module('profitelo.components.dashboard.settings.modals.payments.add-payment-method', [
  'ui.bootstrap',
  'profitelo.components.braintree-form',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable'
])
  .controller('addPaymentMethodController', AddPaymentMethodController)
