import { Component, Input } from '@angular/core';
import { GetPayoutMethod, MoneyDto } from '@anymind-ng/api';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

export interface IFinancialOperationDetails {
  id: string;
  date: Date;
  payoutMethod: GetPayoutMethod;
  payoutValue: MoneyDto;
}

@Component({
  selector: 'plat-financial-operation-details',
  templateUrl: './financial-operation-details.component.html',
  styleUrls: ['./financial-operation-details.component.sass'],
})
export class FinancialOperationDetailsComponent extends Logger {
  @Input()
  public set financialOperationDetails(value: IFinancialOperationDetails | undefined) {
    if (typeof value !== 'undefined') {
      this.assignValuesForUI(value);
      this.assignPayoutMethodForUI(value.payoutMethod);
    }
  }

  public id: string;
  public date: Date;
  public payoutMethodTrKey: string;
  public payoutAmount = 0;
  public payoutCurrency = 'PLN';

  private readonly moneyDivider = 100;

  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }

  private assignValuesForUI = (activityDetails: IFinancialOperationDetails): void => {
    this.id = activityDetails.id;
    this.date = activityDetails.date;
    /**
     * multiple by -1 to make amount as positive number
     */
    this.payoutAmount = (activityDetails.payoutValue.amount * -1) / this.moneyDivider;
    this.payoutCurrency = activityDetails.payoutValue.currency;
  };

  private assignPayoutMethodForUI = (payoutMethod: GetPayoutMethod): void => {
    if (typeof payoutMethod.bankAccount !== 'undefined') {
      this.payoutMethodTrKey = 'ACTIVITY_DETAILS.DETAIL_TITLE.PAYOUT_METHOD.BANK';

      return;
    }
    if (typeof payoutMethod.payPalAccount !== 'undefined') {
      this.payoutMethodTrKey = 'ACTIVITY_DETAILS.DETAIL_TITLE.PAYOUT_METHOD.PAYPAL';

      return;
    }
    this.loggerService.error('unhandled payout method', payoutMethod);
  };
}
