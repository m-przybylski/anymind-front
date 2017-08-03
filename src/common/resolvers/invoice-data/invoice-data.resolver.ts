import * as angular from 'angular'
import ILogService = angular.ILogService
import {CompanyInfo} from 'profitelo-api-ng/model/models'
import {AccountApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import {HttpCodes} from '../../classes/http-codes'

export interface IInvoiceDataResolver {
  resolveCompanyInfo: () => ng.IPromise<CompanyInfo>
}

export class InvoiceDataResolver implements IInvoiceDataResolver {
  constructor(private AccountApi: AccountApi, private $log: ILogService) {
  }

  public resolveCompanyInfo = (): ng.IPromise<CompanyInfo> => {
    return this.AccountApi.getCompanyInfoRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)
  }

  private onGetCompanyInfoRoute = (companyInfo: CompanyInfo): CompanyInfo => {
    return companyInfo
  }
  private onGetCompanyInfoRouteError = (error: any): void => {
    if (error.status !== HttpCodes.httpCodes.fileNotFound) {
      this.$log.error('Can not get company info: ' + error)
    }
    return void 0
  }
}

angular.module('profitelo.resolvers.invoice-data', [
  apiModule
])
.config(($qProvider: ng.IQProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
})
.service('invoiceDataResolver', InvoiceDataResolver)
