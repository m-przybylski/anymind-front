import * as angular from 'angular'
import '../../common/resolvers/login-confirm-email/login-confirm-email.service'
import {ILoginConfirmEmailService} from '../../common/resolvers/login-confirm-email/login-confirm-email.service'

export interface IConfirmEmailStateParams extends ng.ui.IStateParamsService {
  token: string
}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.confirm-email', {
    url: '/confirm-email/token/:token',
    /* istanbul ignore next */
    resolve: {
      /* istanbul ignore next */
      account: (
        LoginConfirmEmailResolver: ILoginConfirmEmailService,
        $stateParams: IConfirmEmailStateParams
      ): ng.IPromise<void> => LoginConfirmEmailResolver.resolve($stateParams)
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.CONFIRM_EMAIL'
    }
  })
}

const confirmEmailModule = angular.module('profitelo.controller.confirm-email', [
  'ui.router',
  'profitelo.resolvers.login-confirm-email'
])
.config(config)
  .name

export default confirmEmailModule