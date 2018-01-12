(function(): void {

  function controller(): void {

    return this
  }

  const component = {
    transclude: true,
    bindings: {
      isLoading: '=?'
    },
    template: require('./preloader.html'),
    controllerAs: '$ctrl',
    controller: [controller]
  }

  angular.module('profitelo.components.interface.preloader', [
    'pascalprecht.translate'
  ])
    .component('preloader', component)
}())