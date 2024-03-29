import { Component, Inject, OnDestroy } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, Subject } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { COMMISSION, ICommission } from '@platform/core/commission';

@Component({
  templateUrl: 'consultation-footer-leave.component.html',
  styleUrls: ['consultation-footer-leave.component.sass'],
})
export class ConsultationFooterLeaveComponent extends Logger implements IFooterOutput, OnDestroy {
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return this._actionTaken$.asObservable();
  }
  public get grossPrice(): string {
    return (
      this.moneyPipe.transform(this.data.price && this.data.price) ||
      this.moneyPipe.transform({ value: 0, currency: '' })
    );
  }

  public get price(): string {
    return (
      this.moneyPipe.transform(
        this.data.price && {
          value:
            this.data.price.value *
            (1 -
              (this.commissionConfig.freelanceConsultationAnyMindCommission +
                this.commissionConfig.freelanceConsultationCompanyCommission)),
          currency: this.data.price.currency,
        },
      ) || this.moneyPipe.transform({ value: 0, currency: '' })
    );
  }

  public get isFreelance(): boolean {
    return this.data.isFreelance;
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);
  constructor(
    @Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData,
    @Inject(COMMISSION) private commissionConfig: ICommission,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationFooterLeaveComponent'));
  }

  public ngOnDestroy(): void {
    this._actionTaken$.complete();
  }

  public onLeave = (): void => {
    this._actionTaken$.next('leaveConsultation');
  };
}
