import * as angular from "angular"
import sessionModule from "../../../../../services/session/session"
import {PaymentLink} from "../../../../../api/model/PaymentLink"
import apiModule from "../../../../../api/api.module"
import {PayPalPaymentFormComponent} from "./paypal.component"
import {PaypalFactory} from "./paypal.service"

export interface IPayPalPaymentFormComponentBindings {
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: any
  paymentCountryId: string
}

const paypalModule = angular.module('profitelo.components.dashboard.charge-account.payment-method.paypal', [
  sessionModule,
  apiModule,
  'profitelo.components.dashboard.charge-account.summary-charge-account'
])
.component('paypalPaymentForm', new PayPalPaymentFormComponent())
.factory('paypalFactory', PaypalFactory)
  .name

export default paypalModule
