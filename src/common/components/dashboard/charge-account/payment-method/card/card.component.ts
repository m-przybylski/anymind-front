import {CardPaymentFormComponentController} from './card.controller';
import {PaymentLink} from 'profitelo-api-ng/model/models'

// TODO TO BE FIXED after charge-account typing fix.
export interface ICardPaymentFormComponentBindings {
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: any
  paymentCountryId: string
  onCardPayment: () => void
}

export class CardPaymentFormComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = CardPaymentFormComponentController
  template = require('./card.pug')()
  replace: true
  bindings: {[boundProperty: string]: string} = {
    paymentsLinks: '<',
    amountMethodModal: '<',
    paymentCountryId: '<',
    onCardPayment: '<'
  }
}
