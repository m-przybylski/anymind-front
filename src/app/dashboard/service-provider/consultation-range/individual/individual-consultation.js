(function() {
  function IndividualConsultationController($scope, $state, $timeout, savedProfile, ServiceApi, proTopAlertService, profileImage, DialogService, serviceProviderService) {

    this.costModel = serviceProviderService.createDefaultModel('')
    this.editModel = serviceProviderService.createDefaultModel(0)

    this.queue = serviceProviderService.createDefaultQueue(3, 1, 0)
    this.editQueue = serviceProviderService.createDefaultQueue(3, 4, 3)

    this.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]
    this.consultations = []
    this.profile = {}
    this.profileImage = profileImage

    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      this.profile = savedProfile.expertDetails
      this.consultations = savedProfile.services
    } else if (savedProfile.organizationDetails) {
      $state.go('app.dashboard.service-provider.consultation-range.company')
    }

    let _postConsultationMethod = (callback) => {
      ServiceApi.postService({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: parseInt(this.costModel.cost, 10)
        },
        invitations: []
      }).$promise.then((res)=> {

        if (angular.isDefined(res) && typeof callback === 'function') {
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
      this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()
    $scope.$watch(() => {
      return this.queue.completedSteps
    }, _calculateProgressPercentage)

    this.backToFirstStep = ()=> {
      serviceProviderService.backToFirstStep(savedProfile.expertDetails, savedProfile.organizationDetails)
    }


    this.saveConsultationObject = () => {
      let _redirectCallBack = () => {
        $state.go('app.dashboard.service-provider.summary.individual')
      }
      if (this.queue.completedSteps === this.queue.amountOfSteps) {
        _postConsultationMethod(_redirectCallBack)
      } else {
        _redirectCallBack()
      }

    }

    this.isConsultationPresent = () => {
      return this.consultations.length > 0
    }

    this.editConsultation = (id, name, price, tags) => {
      this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
      this.editQueue = {
        amountOfSteps: 3,
        currentStep: 4,
        completedSteps: 3,
        skippedSteps: {}
      }
      this.editModel = {
        name: name,
        tags: tags,
        cost: price
      }
      this.updateConsultation = () => {
        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: this.editModel.name,
            tags: this.editModel.tags,
            price: parseInt(this.editModel.cost, 10)
          },
          invitations: []
        }).$promise.then(() => {
          $state.reload()
        })
      }
    }
    this.deleteConsultation = (id, index) => {
      let _callback = ()=> {
        ServiceApi.deleteService({
          serviceId: id
        }).$promise.then((res)=> {
          this.consultations.splice(index, 1)
        }, (err) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
      DialogService.openDialog($scope, _callback)
    }

    this.addAnotherConsultation = () => {
      _postConsultationMethod($state.reload)
    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range.individual', [
    'profitelo.services.dialog-service',
    'ui.router',
    'profitelo.services.service-provider-service',
    'c7s.ng.userAuth',
    'profitelo.services.service-provider-state',
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.consultation-range.individual', {

        url:          '/individual',
        templateUrl:  'dashboard/service-provider/consultation-range/individual/individual-consultation.tpl.html',
        controller:   'IndividualConsultationController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($q, $state, ProfileApi, User) => {
            /* istanbul ignore next */
            let _deferred = $q.defer()
            /* istanbul ignore next */
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

            /* istanbul ignore next */
            return _deferred.promise
          },
          profileImage: (AppServiceProviderImageResolver, savedProfile) => {
            return AppServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
          }

        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
        }
      })
    })
    .controller('IndividualConsultationController', IndividualConsultationController)

}())