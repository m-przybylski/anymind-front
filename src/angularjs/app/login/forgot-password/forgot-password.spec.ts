import * as angular from 'angular'

import {RecoverPasswordApiMock} from 'profitelo-api-ng/api/api'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import './forgot-password'
import {IRootScopeService} from '../../../common/services/root-scope/root-scope.service';

describe('Unit tests: profitelo.controller.login.forgot-password >', () => {
  describe('Testing Controller: ForgotPasswordController', () => {

    let scope: any
    let ForgotPasswordController: any
    let httpBackend: ng.IHttpBackendService
    let RecoverPasswordApiMock: RecoverPasswordApiMock
    const _url = 'awesomeUrl'

    const account = {
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: ''
      },
      sessionId: '123fsdf'
    }

    const $state = {
      go: (): void => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.login.forgot-password')
      angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _$httpBackend_: ng.IHttpBackendService,
              _RecoverPasswordApiMock_: RecoverPasswordApiMock) => {
        scope = $rootScope.$new()
        httpBackend = _$httpBackend_
        RecoverPasswordApiMock = _RecoverPasswordApiMock_
        ForgotPasswordController = $controller('ForgotPasswordController', {
          $state: $state,
          account: account,
          topWaitingLoaderService: _topWaitingLoaderService_
        })
      })
    })

    it('should exsist', () => {
      expect(!!ForgotPasswordController).toBe(true)
    })

    it('should redirect to app-login.set-new-password', () => {
      spyOn($state, 'go')
      RecoverPasswordApiMock.postRecoverPasswordVerifyMsisdnRoute(200, {})
      ForgotPasswordController.submitSmsVerificationCode()
      httpBackend.flush()
      expect($state.go).toHaveBeenCalledWith('app.login.set-new-password', Object({
        token: '',
        method: 'sms'
      }))
    })

    it('should display error on server error', () => {
      RecoverPasswordApiMock.postRecoverPasswordVerifyMsisdnRoute(500)
      ForgotPasswordController.submitSmsVerificationCode()
      httpBackend.flush()
      expect(ForgotPasswordController.serverError).toBe(true)
    })

    it('should redirect to app.login.forgot-password', () => {
      spyOn($state, 'go')
      ForgotPasswordController.forceSmsRecovery()
      expect($state.go).toHaveBeenCalledWith('app.login.forgot-password', Object({method: 'sms'}), Object({reload: true}))
    })

  })
})