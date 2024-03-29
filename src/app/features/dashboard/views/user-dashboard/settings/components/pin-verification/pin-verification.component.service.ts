import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { map, catchError } from 'rxjs/operators';
import { AccountService, RecoverPasswordService, PostRecoverPassword } from '@anymind-ng/api';
import { Injectable } from '@angular/core';

export enum PinVerificationStatus {
  SUCCESS,
  ERROR,
  INVALID_TOKEN,
  CAN_NOT_FIND_TOKEN,
  TOO_MANY_ATTEMPTS,
}

@Injectable()
export class PinVerificationComponentService {
  private readonly pinVerificationStatusMap: Map<BackendErrors, PinVerificationStatus> = new Map<
    BackendErrors,
    PinVerificationStatus
  >([
    [BackendErrors.MsisdnVerificationTokenIncorrect, PinVerificationStatus.INVALID_TOKEN],
    [BackendErrors.IncorrectValidation, PinVerificationStatus.INVALID_TOKEN],
    [BackendErrors.CannotFindMsisdnToken, PinVerificationStatus.CAN_NOT_FIND_TOKEN],
    [BackendErrors.CanNotFindMsisdnVerification, PinVerificationStatus.CAN_NOT_FIND_TOKEN],
    [BackendErrors.TooManyMsisdnTokenAttempts, PinVerificationStatus.TOO_MANY_ATTEMPTS],
  ]);
  private logger: LoggerService;

  constructor(
    private alertService: AlertService,
    private recoverPasswordService: RecoverPasswordService,
    private accountService: AccountService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PinVerificationComponentService');
  }

  public verifyResetPasswordPinToken = (token: string, msisdn: string): Observable<PinVerificationStatus> =>
    this.recoverPasswordService
      .postRecoverPasswordMsisdnVerifyRoute({
        token,
        msisdn,
      })
      .pipe(
        map(() => PinVerificationStatus.SUCCESS),
        catchError(err => of(this.handleError(err))),
      );

  public verifyChangeMsisdnPinToken = (token: string): Observable<PinVerificationStatus> =>
    this.accountService
      .postMsisdnConfirmRoute({
        token,
      })
      .pipe(
        map(() => PinVerificationStatus.SUCCESS),
        catchError(err => of(this.handleError(err))),
      );

  public sendNewRecoverPasswordToken = (msisdn: string): Observable<void> =>
    this.recoverPasswordService
      .postRecoverPasswordRoute({ msisdn, clientAppType: PostRecoverPassword.ClientAppTypeEnum.PLATFORM })
      .pipe(catchError(this.handleResendPinCodeError));

  public sendNewChangeMsisdnToken = (msisdn: string): Observable<void> =>
    this.accountService.putMsisdnRoute({ msisdn }).pipe(catchError(this.handleResendPinCodeError));

  private handleResendPinCodeError = (httpError: HttpErrorResponse): Observable<void> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('error when try to recover password', httpError);

    return of();
  };

  // tslint:disable-next-line:cyclomatic-complexity
  private handleError = (httpError: HttpErrorResponse): PinVerificationStatus => {
    const error = httpError.error;

    if (isBackendError(error)) {
      const status = this.pinVerificationStatusMap.get(error.code);

      return status ? status : this.handleUnhandledBackendError(httpError);
    }
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('error when checking pin code', error);

    return PinVerificationStatus.ERROR;
  };

  private handleUnhandledBackendError = (error: HttpErrorResponse): PinVerificationStatus => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('unhandled backed error', error);

    return PinVerificationStatus.ERROR;
  };
}
