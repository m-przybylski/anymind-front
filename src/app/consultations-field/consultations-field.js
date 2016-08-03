(function() {
  function ConsultationsFieldController() {
    this.controlls = {}

    this.nextSlide = () => {
      this.controlls.nextSlide()
    }

    this.prevSlide = () => {
      this.controlls.prevSlide()
    }

    this.expertCard = [
      {
        name: 'Pierwszy Slide',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Środkowy Slide',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ragnar Lodbrok',
        status: 'available'
      },
      {
        name: 'Ostatni',
        status: 'available'
      }
    ]


    return this
  }

  angular.module('profitelo.controller.consultations-field', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.pro-footer',
    'profitelo.components.interface.slider',
    'profitelo.components.pro-search-dropdown'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.consultations-field', {
        url:          '/consultations-field/{fieldId:int}',
        templateUrl:  'consultations-field/consultations-field.tpl.html',
        controller:   'ConsultationsFieldController',
        controllerAs: 'vm',
        data : {
          access : UserRolesProvider.getAccessLevel('public'),
          pageTitle: 'HOME.FIELD.PAGE_TITLE'
        }
      })
    })
    .controller('ConsultationsFieldController', ConsultationsFieldController)

}())
