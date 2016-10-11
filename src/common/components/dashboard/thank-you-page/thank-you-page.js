(function() {

  /* @ngInject */
  function thankYouPageController($location) {

    this.showRecharge = false
    this.price = null

    this.paymentsValues = {
      currency: $location.search().currency || 0,
      amount: parseInt($location.search().amount, 0)
    }

    if (this.paymentsValues.currency.length === 3 && this.paymentsValues.amount > 0) {
      this.price = this.paymentsValues.amount + ' ' + this.paymentsValues.currency
      this.showRecharge = true
    }
  }

  let thankYouPage = {
    templateUrl: 'components/dashboard/thank-you-page/thank-you-page.tpl.html',
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: thankYouPageController,
    controllerAs: '$ctrl'
  }
  angular.module('profitelo.components.dashboard.thank-you-page', [])
    .component('thankYouPage', thankYouPage)

}())