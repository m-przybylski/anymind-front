namespace profitelo.dashboard.client.favourites {

  import IClientFavouritesResolverService = profitelo.resolvers.clientFavourites.IClientFavouritesResolverService
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  import GetDashboardClientExperts = profitelo.api.GetDashboardClientExperts
  import ISearchResultRow = profitelo.services.search.ISearchResultRow

  function DashboardClientFavouritesController($log: ng.ILogService, lodash: _.LoDashStatic,
                                               clientFavouritesConsultations: GetDashboardClientExperts,
                                               recommendedServices: IRecommendedServicesService) {
    this.balance = clientFavouritesConsultations.balance
    this.lastConsultations = lodash.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
    this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

    const onGetRecommendedExperts = (recommendedExperts: Array<ISearchResultRow>) =>
      this.similarExperts = recommendedExperts

    const onGetRecommendedExpertsError = (err: any) =>
      $log.error(err)

    recommendedServices.getRecommendedExperts(this.lastConsultations || this.favouriteProfiles)
      .then(onGetRecommendedExperts, onGetRecommendedExpertsError)

    return this
  }


  angular.module('profitelo.controller.dashboard.client.favourites', [
    'ui.router',
    'ngLodash',
    'profitelo.services.session',
    'profitelo.filters.money',
    'profitelo.services.recommended-services',
    'profitelo.components.dashboard.client.favourites.no-favourite-experts',
    'profitelo.components.dashboard.client.favourites.favourite-experts',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider',
    'profitelo.resolvers.client-favourites'
  ])
    .config( function($stateProvider: ng.ui.IStateProvider) {
      $stateProvider.state('app.dashboard.client.favourites', {
        url: '/favourites',
        templateUrl: 'dashboard/client/favourites/favourites.tpl.html',
        controller: 'DashboardClientFavouritesController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          clientFavouritesConsultations:  (ClientFavouritesResolver: IClientFavouritesResolverService) =>
            ClientFavouritesResolver.resolve()
        }
      })
    })
    .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)
}

