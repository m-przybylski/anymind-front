import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService, GetRegistrationStatus } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { map, catchError } from 'rxjs/operators';
import { Alerts, AlertService } from '@anymind-ng/components';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import {
  RegistrationInvitationService
} from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

export enum PhoneNumberServiceStatus {
  SUCCESS,
  MSISDN_INVALID,
  ERROR
}

@Injectable()
export class PhoneNumberViewService {

  private logger: LoggerService;
  private prefixLength = 3;

  constructor(private registrationService: RegistrationService,
              private router: Router,
              private alertService: AlertService,
              private registrationInvitationService: RegistrationInvitationService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('PhoneNumberViewService');
  }

  public handlePhoneNumber = (msisdn: string): Observable<PhoneNumberServiceStatus> =>
    this.registrationService.checkRegistrationStatusRoute(msisdn)
      .pipe(map(status => this.handleRegistrationStatus(msisdn, status.status)))
      .pipe(catchError(this.handleRegistrationStatusError))

  public getPhoneNumberFromInvitation = (): string | undefined => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    return this.checkIsMsisdnInvitationExist() && invitationObject && invitationObject.msisdn
      ? invitationObject.msisdn.slice(this.prefixLength)
      : undefined;
  }

  private handleRegistrationStatus = (msisdn: string, status: GetRegistrationStatus.StatusEnum):
    PhoneNumberServiceStatus => {
    switch (status) {
      case GetRegistrationStatus.StatusEnum.REGISTERED:
        this.router.navigate(['/login/password', msisdn])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login/password', status);
            }
          });
        return PhoneNumberServiceStatus.SUCCESS;

      case GetRegistrationStatus.StatusEnum.UNREGISTERED:
        this.router.navigate(['/login/pin-code', msisdn])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login/pin-code', status);
            }
          });
        return PhoneNumberServiceStatus.SUCCESS;

      case GetRegistrationStatus.StatusEnum.NOPASSWORD:
        this.router.navigate(['/login/pin-code', msisdn], {queryParams: {noPasswordRegistrationStatus : true}})
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login/pin-code', status);
            }
          });
        return PhoneNumberServiceStatus.SUCCESS;

      case GetRegistrationStatus.StatusEnum.VERIFICATIONATTEMPTSEXCEEDED:
        this.alertService.pushDangerAlert('ALERT.MSISDN_VERIFICATION_ATTEMPTS_EXCEEDED', {msisdn});
        return PhoneNumberServiceStatus.ERROR;

      case GetRegistrationStatus.StatusEnum.BLOCKED:
        this.router.navigate(['/login/blocked'])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login/blocked', status);
            }
          });
        return PhoneNumberServiceStatus.SUCCESS;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Unhandled registration status', status);
        return PhoneNumberServiceStatus.ERROR;
    }
  }

  private handleRegistrationStatusError = (err: HttpErrorResponse): Observable<PhoneNumberServiceStatus> => {
    const error = err.error;
    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.NotAllowedToLogin:
          this.router.navigate(['/login/limited-access'])
            .then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                this.logger.warn('Can not redirect to login/limited-access', status);
              }
            });
          return of(PhoneNumberServiceStatus.SUCCESS);

        case BackendErrors.IncorrectValidation:
          return of(PhoneNumberServiceStatus.MSISDN_INVALID);

        default:
          this.logger.error('Error when handling phone number', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          return of(PhoneNumberServiceStatus.ERROR);
      }
    } else {
      this.logger.warn('Error when handling phone number', err);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      return of(PhoneNumberServiceStatus.ERROR);
    }
  }

  private checkIsMsisdnInvitationExist = (): boolean => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    return invitationObject !== void 0 && invitationObject.msisdn !== void 0;
  }
}