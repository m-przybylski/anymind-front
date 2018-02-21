import * as angular from 'angular';
import { DashboardProfileActivitiesService } from './dashboard-profile-activities.service';
import apiModule from 'profitelo-api-ng/api.module';

const dashboardActivitiesModule = angular.module('profitelo.services.dashboard-activities', [
  apiModule
])
.service('dashboardActivitiesService', DashboardProfileActivitiesService)
  .name;

export default dashboardActivitiesModule;
