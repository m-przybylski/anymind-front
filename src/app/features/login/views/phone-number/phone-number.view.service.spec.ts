import { TestBed } from '@angular/core/testing';
import { PhoneNumberViewService } from './phone-number.view.service';
import { GetRegistrationStatus, RegistrationService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import { AlertService } from '@anymind-ng/components';
import {
  RegistrationInvitationService
} from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { of } from 'rxjs/observable/of';
import { LoggerFactory } from '@anymind-ng/core';

describe('Service: PhoneNumberService', () => {

  const correctPhoneNumber = '+48555555555';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhoneNumberViewService,
        {provide: RegistrationService, useValue: createSpyObj('RegistrationService', ['checkRegistrationStatusRoute'])},
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {
          provide: RegistrationInvitationService,
          useValue: createSpyObj('RegistrationInvitationService', ['getInvitationObject'])
        },
        {provide: Router, useValue: createSpyObj('Router', ['navigate'])}
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {
      },
      error: (): void => {
      }
    });
  });

  it('should redirect user to blocked view after send phone number', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: GetRegistrationStatus.StatusEnum.BLOCKED}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/blocked']);
  });

  it('should redirect user to password view after send phone number', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: GetRegistrationStatus.StatusEnum.REGISTERED}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/password', correctPhoneNumber]);
  });

  it('should redirect user to pin-code view after send phone number', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: GetRegistrationStatus.StatusEnum.UNREGISTERED}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/login/pin-code', correctPhoneNumber]);
  });

  it('should redirect user to login/pin-code when is registered without password', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const router = TestBed.get(Router);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: GetRegistrationStatus.StatusEnum.NOPASSWORD}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/login/pin-code', correctPhoneNumber], {queryParams: { noPasswordRegistrationStatus: true }});
  });

  it('should display alert after user try to send phone number too many times', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const alerService = TestBed.get(AlertService);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: GetRegistrationStatus.StatusEnum.VERIFICATIONATTEMPTSEXCEEDED}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(alerService.pushDangerAlert)
      .toHaveBeenCalledWith('ALERT.MSISDN_VERIFICATION_ATTEMPTS_EXCEEDED', {msisdn: correctPhoneNumber});
  });

  it('should display alert after user try to send phone number and something goes wrong', () => {
    const phoneNumberService = TestBed.get(PhoneNumberViewService);
    const alerService = TestBed.get(AlertService);
    const registrationService = TestBed.get(RegistrationService);

    registrationService.checkRegistrationStatusRoute.and.returnValue(of(
      {status: undefined}));

    phoneNumberService.handlePhoneNumber(correctPhoneNumber).subscribe();
    expect(alerService.pushDangerAlert)
      .toHaveBeenCalledWith('ALERT.SOMETHING_WENT_WRONG');
  });

});