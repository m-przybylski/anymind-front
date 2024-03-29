import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayoutMethodComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/payout-method.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AddPaymentCardModal } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetPromoCode, PutDefaultPaymentMethod } from '@anymind-ng/api';
import { PaymentsViewComponentService } from '@platform/features/dashboard/views/user-dashboard/payments/payments.view.component.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { PromoCodeComponent } from '@platform/shared/components/modals/payments/promo-code/promo-code.component';
import { select, Store } from '@ngrx/store';
import * as fromPayments from './reducers';
import { FetchPaymentsDetailsInitAction } from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-init.actions';
import { LoadPaymentsMethodOnDeleteSuccessAction } from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-api.actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';

@Component({
  selector: 'plat-payments',
  templateUrl: './payments.view.component.html',
  styleUrls: ['./payments.view.component.sass'],
  providers: [PaymentsViewComponentService],
})
export class PaymentsViewComponent extends Logger implements OnInit, OnDestroy {
  public paymentsCardFormGroup = new FormGroup({});
  public paymentsCardControlName = 'paymentsCardControlName';
  public currentPaymentMethodId = '';
  public promoCodeList$ = this.store.pipe(
    select(fromPayments.getPromoCodesList),
    map(promoCode => promoCode.filter((code: GetPromoCode) => new Date(code.expiresAt).getTime() > Date.now())),
  );
  public paymentsCardList$ = this.store.pipe(select(fromPayments.getPaymentsMethodList));
  public isPending$ = this.store.pipe(select(fromPayments.isPaymentMethodsPending));
  public isSettlementSettingsVisible: boolean;

  private currentPromoCodeId = '';
  private currentPaymentCardId = '';
  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store<fromPayments.IState | fromCore.IState>,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ngbModalService: NgbModal,
    private fb: FormBuilder,
    private paymentsViewComponentService: PaymentsViewComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PaymentsViewComponent'));
  }

  public ngOnInit(): void {
    this.paymentsCardFormGroup = this.fb.group({
      paymentsCardControlName: '',
    });

    this.assignStoreData();
    this.store.pipe(select(fromCore.getUserType)).subscribe(userType => {
      this.isSettlementSettingsVisible = userType !== UserTypeEnum.USER;
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public openInvoiceModal = (): void => {
    this.ngbModalService.open(InvoiceDetailsComponent);
  };

  public openPayoutMethod = (): void => {
    this.ngbModalService.open(
      PayoutMethodComponent,
    ).componentInstance.getPayoutMethod = this.route.snapshot.data.getPayoutMethod;
  };

  public onAddPaymentCard = (): void => {
    this.ngbModalService.open(AddPaymentCardModal);
  };

  public onAddPromoCode = (): void => {
    this.ngbModalService.open(PromoCodeComponent);
  };

  public onSelectCard = (id: string): void => {
    const currentId = this.currentPaymentMethodId;
    this.currentPaymentCardId = id;

    this.paymentsViewComponentService
      .setDefaultPaymentMethod(this.mapCurrentPaymentMethod())
      .pipe(catchError(error => this.handleErrorOnSelect(error, currentId)))
      .subscribe(() => (this.currentPaymentMethodId = id));
  };

  public onSelectPromoCode = (id: string): void => {
    const currentId = this.currentPaymentMethodId;
    this.currentPromoCodeId = id;

    this.paymentsViewComponentService
      .setDefaultPaymentMethod(this.mapCurrentPaymentMethod(id))
      .pipe(catchError(error => this.handleErrorOnSelect(error, currentId)))
      .subscribe(() => {
        this.currentPaymentMethodId = id;
      });
  };

  public onDeleteCard = (id: string): void => {
    this.paymentsViewComponentService
      .deletePaymentCard(id)
      .pipe(
        catchError(error => {
          this.loggerService.warn('Can not delete credit payment card', error);
          this.alertService.pushDangerAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.DELETE.ALERT');

          return of();
        }),
      )
      .subscribe(() => {
        this.store.dispatch(new LoadPaymentsMethodOnDeleteSuccessAction());
      });
  };

  private assignStoreData = (): void => {
    this.store.dispatch(new FetchPaymentsDetailsInitAction());

    this.store
      .pipe(
        select(fromPayments.getDefaultPaymentMethod),
        takeUntil(this.destroyed$),
      )
      .subscribe(currentPaymentMethod => {
        this.currentPaymentMethodId = currentPaymentMethod.promoCodeId || currentPaymentMethod.creditCardId || '';
        this.currentPromoCodeId = currentPaymentMethod.promoCodeId || '';
        this.currentPaymentCardId = currentPaymentMethod.creditCardId || '';
      });
  };

  private mapCurrentPaymentMethod = (promoCodeId?: string): PutDefaultPaymentMethod => {
    if (this.currentPaymentCardId && promoCodeId) {
      return {
        creditCardId: this.currentPaymentCardId,
        promoCodeId: this.currentPromoCodeId,
      };
    } else if (promoCodeId) {
      return {
        promoCodeId,
      };
    } else {
      return {
        creditCardId: this.currentPaymentCardId,
      };
    }
  };

  private handleErrorOnSelect = (error: HttpErrorResponse, currentId: string): Observable<void> => {
    this.currentPaymentMethodId = currentId;
    this.loggerService.warn('Can not set default payment card', error);
    this.alertService.pushDangerAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.SET_AS_DEFAULT.ALERT');

    return of();
  };
}
