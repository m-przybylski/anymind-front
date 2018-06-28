// tslint:disable:strict-boolean-expressions
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VerifiedCodeService } from '../../verified-code.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Alerts, AlertService, FormUtilsService } from '@anymind-ng/components';
import {
  SetNewPasswordFromMsisdnViewService,
  SetNewPasswordFromMsisdnStatus
} from './set-new-password-from-msisdn.view.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { InputSetPasswordErrors } from '../../../../shared/components/input-set-password/input-set-password.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'set-new-password-from-msisdn',
  templateUrl: './set-new-password-from-msisdn.view.component.html',
  styleUrls: ['./set-new-password-from-msisdn.view.component.sass'],
  providers: [SetNewPasswordFromMsisdnViewService]
})

export class SetNewPasswordFromMsisdnViewComponent implements OnInit, OnDestroy {

  public readonly passwordControlName = 'password';
  public readonly setPasswordFormId = 'passwordForm';

  public msisdn: string;
  public token?: string;
  public setPasswordForm: FormGroup;
  public isRequestPending = false;
  public isInputInitialFocused = true;

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private tokenService: VerifiedCodeService,
              private setNewPasswordFromMsisdnService: SetNewPasswordFromMsisdnViewService,
              private formUtils: FormUtilsService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromMsisdnViewComponent');
  }

  public ngOnInit(): void {
    this.setPasswordForm = new FormGroup({});

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });
    this.token = this.tokenService.getVerifiedCode();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (setPasswordForm: FormGroup): void => {
    if (setPasswordForm.valid) {
      if (this.token) {
        this.isRequestPending = true;
        const password = setPasswordForm.controls[this.passwordControlName].value;
        this.setNewPasswordFromMsisdnService.handleNewPassword(this.msisdn, this.token, password)
          .pipe(finalize(() => {
            this.tokenService.unsetVerifiedCode();
            this.isRequestPending = false;
          }))
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(this.handleSetNewPasswordStatus);
      } else {
        this.logger.error('there is no token when try to submit form', this.token);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    } else {
      this.formUtils.validateAllFormFields(setPasswordForm);
    }
  }

  private handleSetNewPasswordStatus = (status: SetNewPasswordFromMsisdnStatus): void => {
    switch (status) {
      case SetNewPasswordFromMsisdnStatus.INVALID:
        this.displayIncorrectPasswordError();
        break;

      case SetNewPasswordFromMsisdnStatus.NO_TOKEN:
        this.logger.warn('Handled password status ', status);
        break;

      case SetNewPasswordFromMsisdnStatus.SUCCESS:
        this.logger.warn('Handled password status ', status);
        break;

      case SetNewPasswordFromMsisdnStatus.ERROR:
        this.logger.warn('Handled password status ', status);
        break;

      default:
        this.logger.error('Unhandled password status ', status);
    }
  }

  private displayIncorrectPasswordError = (): void => {
    this.setPasswordForm.controls[this.passwordControlName]
      .setErrors({[InputSetPasswordErrors.IncorrectPassword]: true});
    this.formUtils.validateAllFormFields(this.setPasswordForm);
  }
}
