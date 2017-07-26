(function(): void {
  /* @ngInject */
  function controller(): void {
    this.isStatusAccepted = true
    this.isStatusInProgress = false
    this.isStatusReported = false
    this.isStatusRejected = false

    return this
  }

  const component = {
    template: require('./status.pug')(),
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.complaints.status', [
    'pascalprecht.translate'
  ])
    .component('status', component)
}())
