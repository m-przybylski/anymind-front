import * as angular from 'angular';
import inputModule from '../../../../../interface/input/input';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import apiModule from 'profitelo-api-ng/api.module';
import { PayoutsModalController } from './payouts.controller';
import { PayoutsModalService } from './payouts.service';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';

const payoutsModalModule: string = angular.module('profitelo.components.dashboard.settings.modals.payouts.payouts', [
  'ui.bootstrap',
  apiModule,
  commonSettingsModule,
  'profitelo.components.interface.preloader',
  inputModule,
  errorHandlerModule
])
  .controller('payoutsModalController', PayoutsModalController)
  .service('payoutsModalService', PayoutsModalService)
  .name;

export default payoutsModalModule;
