(function() {
  function CompanySummaryController($state, $scope, $filter, savedProfile, ServiceApi, proTopAlertService, profileAvatar, companyLogo, DialogService) {


    if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
      this.profile = savedProfile.expertDetails
      this.consultations = savedProfile.services
    } else {
      this.profile = savedProfile.organizationDetails
      this.consultations = savedProfile.services
      if (savedProfile.expertDetails) {
        this.expertProfile = savedProfile.expertDetails
      }
    }

    if (angular.isDefined(savedProfile.services) && savedProfile.services.length < 1) {
      $state.go('app.dashboard.service-provider.consultation-range.company')
    }

    this.companyLogo = companyLogo
    this.profileAvatar = profileAvatar

    this.backToFirstStep = () => {
      $state.go('app.dashboard.service-provider.company-path')
    }

    this.goToExpertEdit = () => {
      $state.go('app.dashboard.service-provider.individual-path')
    }

    this.verifyProfile = ()=> {
      if (!!_.find(this.consultations, {'ownerEmployee': true}) && !savedProfile.expertDetails ) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        ServiceApi.postServicesVerify().$promise.then((res)=> {
          $state.go('app.dashboard.start')
          proTopAlertService.success({
            message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
            timeout: 4
          })
        }, (err) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
    }

    this.editConsultation = (id, name, price, tags, invitations, ownerEmployee) => {
      this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
      this.editQueue = {
        amountOfSteps: 4,
        currentStep: 5,
        completedSteps: 4,
        skippedSteps: {}
      }
      this.editModel = {
        name: name,
        tags: tags,
        cost: price,
        invitations: invitations
      }
      this.ownerEmployee = ownerEmployee
      this.updateConsultation = () => {

        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: this.editModel.name,
            tags: this.editModel.tags,
            price: parseInt(this.editModel.cost, 10)
          },
          ownerEmployee: this.ownerEmployee,
          invitations: this.editModel.invitations
        }).$promise.then(() => {
          $state.reload()
        }, (err) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
    }

    this.deleteConsultation = (id, index) => {
      let _callback = ()=> {
        ServiceApi.deleteService({
          serviceId: id
        }).$promise.then((res)=> {
          this.consultations.splice(index, 1)
          if (this.consultations.length === 0) {
            $state.go('app.dashboard.service-provider.consultation-range.company')
          }
        }, (err) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
      DialogService.openDialog($scope, _callback)
    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.summary.company', [
    'ui.router',
    'profitelo.services.dialog-service',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-summary-head',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    'c7s.ng.userAuth',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert'
  ])
    .config(function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.service-provider.summary.company', {
        url: '/company',
        templateUrl: 'dashboard/service-provider/summary/company/company-summary.tpl.html',
        controller: 'CompanySummaryController',
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
              }).$promise.then((response)=> {
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
          companyLogo: (AppServiceProviderImageResolver, savedProfile) => {
            /* istanbul ignore next */
            return AppServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
          },
          profileAvatar: (AppServiceProviderImageResolver, savedProfile) => {
            /* istanbul ignore next */
            if (angular.isObject(savedProfile.expertDetails)) {
              return AppServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
            }
            return ''
          }
        },
        data: {
          access : UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
        }
      })
    })
    .controller('CompanySummaryController', CompanySummaryController)

}())