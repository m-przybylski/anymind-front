import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';

@Injectable()
export class UnsupportedGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private unsupportedService: UnsupportedService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('UnsupportedGuard');
  }

  public canActivate(): boolean {
    if (this.unsupportedService.isSupported()) {
      return true;
    } else {
      this.router
        .navigate(['/unsupported'])
        .then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to unsupported');
          }
        })
        .catch(this.logger.error.bind(this));

      return false;
    }
  }
}
