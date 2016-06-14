(function() {
  function CompanyConsultationController($scope, $state, savedProfile, ServiceApi, proTopAlertService) {
    let vm = this

    vm.costModel = {
      name: '',
      tags: [],
      cost: '',
      invitations: []
    }

    vm.editModel = {
      name: '',
      tags: [],
      cost: 0,
      invitations: []
    }


    vm.queue = {
      amountOfSteps: 4,
      currentStep: 1,
      completedSteps: 0,
      skippedSteps: {}
    }

    vm.editQueue = {
      amountOfSteps: 4,
      currentStep: 5,
      completedSteps: 4,
      skippedSteps: {}
    }

    vm.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]

    vm.consultations = []
    vm.profile = {}
    let _postConsultationMethod = (callback) => {
      ServiceApi.postService({
        details: {
          name: vm.costModel.name,
          tags: vm.costModel.tags,
          price: parseInt(vm.costModel.cost, 10)
        },
        invitations: vm.costModel.invitations
      }).$promise.then((res)=> {
        if (typeof callback === 'function') {
          callback()
        }
      }, (err)=> {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }


    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    vm.backToFirstStep = () => {
      if (savedProfile.expertDetails && !savedProfile.organizationDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }
    }

    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      vm.profile = savedProfile.expertDetails
      vm.consultations = savedProfile.services
    } else {
      vm.profile = savedProfile.organizationDetails
      vm.consultations = savedProfile.services
    }

    vm.saveConsultationObject = () => {
      if (vm.queue.completedSteps === vm.queue.amountOfSteps) {
        _postConsultationMethod()
      }
      $state.go('app.dashboard.service-provider.summary')
    }

    vm.isConsultationPresent = () => {
      return vm.consultations.length > 0
    }

    vm.editConsultation = (id, name, price, tags, invitations) => {
      vm.currentEditConsultationId = vm.currentEditConsultationId === id ? -1 : id
      vm.editQueue = {
        amountOfSteps: 4,
        currentStep: 5,
        completedSteps: 4,
        skippedSteps: {}
      }
      vm.editModel = {
        name: name,
        tags: tags,
        cost: price,
        invitations: invitations
      }
      vm.updateConsultation = () => {
        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: vm.editModel.name,
            tags: vm.editModel.tags,
            price: parseInt(vm.editModel.cost, 10)
          },
          invitations: vm.editModel.invitations
        }).$promise.then(() => {
          $state.reload()
        })
      }
    }
    vm.deleteConsultation = (id, index) => {
      ServiceApi.deleteService({
        serviceId: id
      }).$promise.then((res)=> {
        vm.consultations.splice(index, 1)
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    vm.addAnotherConsultation = () => {
      _postConsultationMethod($state.reload)
    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range.company', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.company', {

        url:          '/company',
        templateUrl:  'dashboard/service-provider/consultation-range/company/company-consultation.tpl.html',
        controller:   'CompanyConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, User) => {
            let _deferred = $q.defer()
            User.getStatus().then(() => {
              ProfileApi.getProfileWithServices({
                profileId: User.getData('id')
              }).$promise.then((response)=>{
                _deferred.resolve(response)
              }, () => {
                _deferred.resolve(null)
              }, (error)=> {
                _deferred.reject(error)
                $state.go('app.dashboard')
                proTopAlertService.error({
                  message: 'error',
                  timeout: 4
                })
              })
            }, (error) => {
              $state.go('app.dashboard')
              proTopAlertService.error({
                message: 'error',
                timeout: 4
              })
            })


            return _deferred.promise
          }
        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
        }
      })
    })
    .controller('CompanyConsultationController', CompanyConsultationController)

}())