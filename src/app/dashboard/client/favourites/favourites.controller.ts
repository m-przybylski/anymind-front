import * as _ from 'lodash'
import {GetDashboardClientExperts} from 'profitelo-api-ng/model/models'

/* @ngInject */
export function DashboardClientFavouritesController(clientFavouritesConsultations: GetDashboardClientExperts, $state: ng.ui.IStateService) {
  this.balance = clientFavouritesConsultations.balance
  this.lastConsultations = _.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
  this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

  this.searchForExpert = (): void => {
    $state.go('app.search-result')
  }

  return this
}
