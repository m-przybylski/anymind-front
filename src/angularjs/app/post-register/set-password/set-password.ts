import * as angular from 'angular'
import userModule from '../../../common/services/user/user'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {AccountDetails, PutAccount} from 'profitelo-api-ng/model/models'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {PasswordStrengthService} from '../../../common/services/password-strength/password-strength.service'
import {UserService} from '../../../common/services/user/user.service'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import passwordStrengthModule from '../../../common/services/password-strength/password-strength'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import 'angularjs/common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import 'angularjs/common/directives/interface/pro-alert/pro-alert'
import 'angularjs/common/directives/password-strength-bar/password-strength-bar'
import inputPasswordModule from '../../../common/components/interface/input-password/input-password'
import autoFocus from '../../../common/directives/auto-focus/auto-focus'
import {LocalStorageWrapper} from '../../../common/classes/local-storage-wrapper/local-storage-wrapper'
import {ErrorHandlerService} from '../../../common/services/error-handler/error-handler.service'
import errorHandlerModule from '../../../common/services/error-handler/error-handler'
import {RegistrationInvitationService}
from '../../../common/services/registration-invitation/registration-invitation.service'
import registrationInvitationModule from '../../../common/services/registration-invitation/registration-invitation'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function _controller($log: ng.ILogService,
                     $filter: ng.IFilterService,
                     $state: StateService,
                     topWaitingLoaderService: TopWaitingLoaderService,
                     passwordStrengthService: PasswordStrengthService,
                     user: AccountDetails,
                     registrationInvitationService: RegistrationInvitationService,
                     topAlertService: TopAlertService,
                     errorHandler: ErrorHandlerService,
                     CommonSettingsService: CommonSettingsService,
                     AccountApi: AccountApi): void {

  if (user.hasPassword) $state.go('app.post-register.set-email')
  this.passwordStrength = 0
  this.password = ''
  this.enteredCurrentPassword = ''
  this.isPending = false
  this.alreadyCheck = false
  this.isServerError = false

  this.msisdn = {
    number: user.msisdn
  }

  this.patternPassword = CommonSettingsService.localSettings.passwordPattern

  this.onPasswordChange = (password: string): void => {
    this.passwordStrength = passwordStrengthService.getStrength(password)
  }

  const _updateNewUserObject = (patchObject: any, successCallback: (res: Account) => void): void => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      this.isServerError = false
      topWaitingLoaderService.immediate()

      const accountId = user.id

      AccountApi.patchUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
        this.isPending = false
        this.isServerError = true
        topWaitingLoaderService.stopLoader()
        $log.error(error)
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
      })
    }
  }

  const verifyEmailByToken = (token: string): ng.IPromise<Account> =>
    AccountApi.postConfirmEmailViaInvitationRoute(token)

  const redirectToInvitation = (token: string): void => {
    $state.go('app.invitations', {token})
  }

  const clearInvitationFromLocalStorage = (): void => LocalStorageWrapper.removeItem('invitation')

  const checkIsEmailExists = (email: string): ng.IPromise<{}> => AccountApi.getAccountEmailExistsRoute(email)

  const onVerifyEmailError = (error: any): void => {
    $log.error(error)
    $state.go('app.home')
  }

  const setPassword = (): void => {
    _updateNewUserObject({
      password: this.password
    }, () => {
      this.isPending = false
      topWaitingLoaderService.stopLoader()
      $state.go('app.post-register.set-email')
    })
  }

  this.completeRegistration = (): void => {
    this.enteredCurrentPassword = this.password
    const invitationObject = registrationInvitationService.getInvitationObject()
    if (invitationObject && invitationObject.email) {
      checkIsEmailExists(invitationObject.email).then(() => {
        setPassword()
      }, () => {
        putNewUserObject({
          password: this.password,
          unverifiedEmail: invitationObject.email,
          isBlocked: false
        }, () => {
          verifyEmailByToken(invitationObject.token)
          .then(() => {
            clearInvitationFromLocalStorage()
            redirectToInvitation(invitationObject.token)
          }, onVerifyEmailError)
          this.isPending = false
          topWaitingLoaderService.stopLoader()
        })
      })
    } else {
      setPassword()
    }
  }

  const putNewUserObject = (updateObject: PutAccount, successCallback: () => void): void => {
    if (!this.isPending) {
      this.isPending = true
      this.isServerError = false
      topWaitingLoaderService.immediate()
      AccountApi.putAccountRoute(user.id, updateObject)
      .then(successCallback, (error) => {
        this.isServerError = true
        topWaitingLoaderService.stopLoader()
        errorHandler.handleServerError(error)
      })
      .finally(() => {
        this.isPending = false
      })
    }
  }

  this.checkIsPasswordCorrect = (): boolean =>
    this.enteredCurrentPassword !== this.password && this.patternPassword.test(this.password)

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.post-register.set-password', {
    url: '/set-password',
    controllerAs: 'vm',
    controller: 'SetPasswordController',
    template: require('./set-password.html'),
    resolve: {
      user: (userService: UserService, $state: ng.ui.IStateService): ng.IPromise<AccountDetails> => {
        const userData = userService.getUser(true)
        userData.then((user) => {
          if (user.hasPassword) $state.go('app.post-register.set-email')
        })
        return userData
      }
    },

    data: {
      pageTitle: 'PAGE_TITLE.POST_REGISTER.SET_PASSWORD'
    }
  })
}

angular.module('profitelo.controller.post-register.set-password', [
    userModule,
  apiModule,
  commonSettingsModule,
  passwordStrengthModule,
  topAlertModule,
  uiRouter,
  registrationInvitationModule,
  'profitelo.services.pro-top-waiting-loader-service',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.password-strength-bar',
  inputPasswordModule,
  autoFocus,
  errorHandlerModule
])
.config(['$stateProvider', config])
.controller('SetPasswordController', _controller)