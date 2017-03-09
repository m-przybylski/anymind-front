(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./no-favourite-experts.jade')(),
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.favourites.no-favourite-experts', [
    'pascalprecht.translate'
  ])
    .component('clientNoFavouriteExperts', component)
}())


