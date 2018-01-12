import * as angular from 'angular'
import {IFilterService} from '../../../common/services/filter/filter.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi, RegistrationApi} from 'profitelo-api-ng/api/api'
import {PatchAccount, Account} from 'profitelo-api-ng/model/models'
import {LoginStateService} from '../../../common/services/login-state/login-state.service'
import {SessionServiceWrapper} from '../../../common/services/session/session.service'
import {ILoginRegister, ILoginRegisterService} from '../../../common/resolvers/login-register/login-register.service'
import sessionModule from '../../../common/services/session/session'
import loginStateModule from '../../../common/services/login-state/login-state'
import communicatorModule from '../../../common/components/communicator/communicator'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import 'angularjs/common/resolvers/login-register/login-register.service'
import 'angularjs/common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import 'angularjs/common/directives/interface/pro-alert/pro-alert'
import permissionModule from '../../../common/services/permission/permission'
import {EventsService} from '../../../common/services/events/events.service'
import eventsModule from '../../../common/services/events/events'
import inputModule from '../../../common/components/interface/input/input'
import checkboxModule from '../../../common/components/interface/checkbox/checkbox'
import {CommonConfig} from '../../../../../generated_modules/common-config/common-config'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function RegisterController($log: ng.ILogService,
                            $filter: IFilterService,
                            $state: StateService,
                            topWaitingLoaderService: TopWaitingLoaderService,
                            eventsService: EventsService,
                            sessionServiceWrapper: SessionServiceWrapper,
                            topAlertService: TopAlertService,
                            smsSessionId: ILoginRegister,
                            CommonSettingsService: CommonSettingsService,
                            RegistrationApi: RegistrationApi,
                            AccountApi: AccountApi,
                            loginStateService: LoginStateService,
                            CommonConfig: CommonConfig): void {
  this.passwordStrength = 0
  this.isPending = false
  this.rulesAccepted = false
  this.serverError = false
  this.newCurrentSmsCode = ''
  this.alreadyCheck = false
  this.correctCode = false
  this.areRulesAccepted = false
  this.isRequired = true
  let userid = ''

  this.registrationSteps = {
    account: smsSessionId.accountObject,
    smsCode: null,
    sessionId: smsSessionId.sessionId
  }

  this.rulesTranslationUrl = {
    hrefUrl: CommonConfig.getAllData().urls['terms-of-service']
  }

  this.smsCodePattern = CommonSettingsService.localSettings.smsCodePattern

  this.verifyCode = (): void => {
    if (angular.isDefined(this.registrationSteps.smsCode) &&
      this.registrationSteps.smsCode !== null && !this.alreadyCheck) {
      this.alreadyCheck = true
      RegistrationApi.verifyVerificationRoute({
        sessionId: this.registrationSteps.sessionId,
        token: String(this.registrationSteps.smsCode)
      }).then(() => {
        this.correctCode = true
      }, (err: any) => {
        $log.error(err)
        this.serverError = true
      })
    } else if (!angular.isDefined(this.registrationSteps.smsCode) || this.registrationSteps.smsCode === null) {
      this.alreadyCheck = false
      this.serverError = false
      this.correctCode = false
    }
  }

  this.getSmsCodeStatus = (): void => {
    this.newCurrentSmsCode = this.registrationSteps.smsCode
    this.serverError = false
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      RegistrationApi.confirmVerificationRoute({
        sessionId: this.registrationSteps.sessionId,
        token: String(this.registrationSteps.smsCode)
      }).then((_response) => {
        sessionServiceWrapper.getSession(true).then((session) => {
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          eventsService.emit('login')
          userid = session.accountId
          loginStateService.clearServiceObject()
          $state.go('app.post-register.set-password')
        })
      }, (error: any) => {
        $log.error(error)
        this.isPending = false
        this.serverError = true
        topWaitingLoaderService.stopLoader()
      })
    }
  }

  const _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void): void => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()

      AccountApi.patchUpdateAccountRoute(userid, patchObject).then(successCallback, (error) => {
        this.isPending = false
        $log.error(error)
        topWaitingLoaderService.stopLoader()
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
      })

    }
  }

  this.completeRegistration = (): void => {
    const lastRegistrationStep: number = 3
    _updateNewUserObject({
      password: this.registrationSteps.password
    }, () => {
      this.isPending = false
      this.current = lastRegistrationStep
      topWaitingLoaderService.stopLoader()
    })
  }

  this.checkIsCodeCorrect = (): boolean =>
    this.newCurrentSmsCode !== this.registrationSteps.smsCode

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.login.register', {
    url: '/register',
    controllerAs: 'vm',
    controller: 'RegisterController',
    template: require('./register.html'),
    resolve: {
      smsSessionId: ['LoginRegisterResolver',
        (LoginRegisterResolver: ILoginRegisterService): ng.IPromise<{} | ILoginRegister> =>
          LoginRegisterResolver.resolve()]
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

angular.module('profitelo.controller.login.register', [
  sessionModule,
  loginStateModule,
  'profitelo.resolvers.login-register',
  apiModule,
  uiRouter,
  communicatorModule,
  commonSettingsModule,
  topAlertModule,
  permissionModule,
  eventsModule,
  'profitelo.services.pro-top-waiting-loader-service',
  'profitelo.directives.interface.pro-alert',
  inputModule,
  checkboxModule
])
  .config(['$stateProvider', config])
  .controller('RegisterController', ['$log', '$filter', '$state', 'topWaitingLoaderService',
    'eventsService', 'sessionServiceWrapper', 'topAlertService', 'smsSessionId', 'CommonSettingsService',
    'RegistrationApi', 'AccountApi', 'loginStateService', 'CommonConfig', RegisterController])
