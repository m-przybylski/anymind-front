import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AccountService } from '@anymind-ng/api';
import { RouterPaths } from '@platform/shared/routes/routes';

@Injectable()
export class ConfirmEmailGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private accountService: AccountService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ConfirmEmailGuard');
  }

  public canActivate = (route: ActivatedRouteSnapshot): Observable<boolean> => {
    const token = route.params.token;

    return this.accountService
      .postAccountVerifyEmailRoute(token)
      .pipe(
        map(() => {
          this.logger.log('valid email token, allow access');
          this.alertService.pushSuccessAlert(Alerts.SetEmailViewSuccess);
          this.redirectToDashboard();

          return true;
        }),
      )
      .pipe(
        catchError(error => {
          this.alertService.pushDangerAlert(Alerts.SetEmailViewSuccess);
          this.logger.warn('error when try to verify email token, error: ', error);
          this.redirectToDashboard();

          return of(false);
        }),
      );
  };

  private redirectToDashboard = (): void => {
    this.router
      .navigate([RouterPaths.dashboard.user.welcome.asPath])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.logger.warn('Can not redirect to /dashboard/user/activities');
        }
      })
      .catch(err => this.logger.error(err));
  };
}
