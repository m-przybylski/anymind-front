import {UserService} from '../../../../services/user/user.service'
import * as angular from 'angular'
import userModule from '../../../../services/user/user'
import {Config} from '../../../../../app/config';
import uiRouter from '@uirouter/angularjs'

function controller(userService: UserService): void {

  this.isPlatformForExpert = Config.isPlatformForExpert

  userService.getUser().then((accountDetails) => {
    this.isWizardComplete = accountDetails.isCompany || accountDetails.isExpert
  })
  return this
}

const component = {
  template: require('./navigation.html'),
  controller: ['userService', controller],
  controllerAs: '$ctrl',
  bindings: {
    stateNames: '<'
  }
}

const settingsNavigation = angular.module('profitelo.components.settings.navigation', [
  'pascalprecht.translate',
  uiRouter,
  userModule
])
  .component('settingsNavigation', component)
  .name

export default settingsNavigation