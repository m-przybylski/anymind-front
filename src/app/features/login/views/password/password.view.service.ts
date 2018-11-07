import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterPaths } from '@platform/shared/routes/routes';

export enum PasswordLoginStatus {
  SUCCESS,
  ERROR,
  WRONG_PASSWORD,
  TOO_MANY_ATTEMPTS,
  SUCCESS_WITH_INVITATION,
}

@Injectable()
export class PasswordViewService {
  private logger: LoggerService;

  constructor(
    private userSessionService: UserSessionService,
    private router: Router,
    private registrationInvitationService: RegistrationInvitationService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PasswordViewService');
  }

  public login = (msisdn: string, password: string): Promise<PasswordLoginStatus> =>
    this.userSessionService
      .login({ msisdn, password })
      .then(this.determinateRedirectPath)
      .catch(this.handlePasswordStatus);

  private redirectToDashboard = (): Promise<PasswordLoginStatus> =>
    this.router.navigate([RouterPaths.dashboard.user.welcome.asPath]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.logger.warn('Error when redirect to dashboard/expert/activities');

        return PasswordLoginStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.UserLoggedIn);

        return PasswordLoginStatus.SUCCESS;
      }
    });

  private redirectToInvitations = (): Promise<PasswordLoginStatus> =>
    this.router.navigate([RouterPaths.dashboard.user.invitations.asPath]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to invitations');

        return PasswordLoginStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.UserLoggedIn);

        return PasswordLoginStatus.SUCCESS_WITH_INVITATION;
      }
    });

  private handlePasswordStatus = (httpError: HttpErrorResponse): PasswordLoginStatus => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.IncorrectValidation:
          return PasswordLoginStatus.WRONG_PASSWORD;

        case BackendErrors.BadAuthenticationCredentials:
          return PasswordLoginStatus.WRONG_PASSWORD;

        case BackendErrors.MsisdnBlocked:
          this.router
            .navigate(['/login/blocked'])
            .then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                this.logger.warn('Error when redirect to login/blocked');
              }
            })
            .catch(this.logger.error.bind(this));
          break;

        case BackendErrors.ToManyIncorrectPasswordAttempts:
          return PasswordLoginStatus.TOO_MANY_ATTEMPTS;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend error status when userSessionService', err);

          return PasswordLoginStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling password', httpError);

      return PasswordLoginStatus.ERROR;
    }

    throw err;
  };

  private determinateRedirectPath = (): Promise<PasswordLoginStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject !== void 0 && invitationObject.token !== void 0
      ? this.redirectToInvitations()
      : this.redirectToDashboard();
  };
}
