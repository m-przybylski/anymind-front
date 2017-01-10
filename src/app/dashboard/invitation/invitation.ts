(function() {

  function InvitationController(pendingInvitations, companyLogo) {

    if (pendingInvitations.length > 0) {
      this.invitations = pendingInvitations
      this.invitations[0].organizationDetails.logoUrl = companyLogo
    }

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.invitation', {
      url: '/invitations',
      controllerAs: 'vm',
      controller: 'InvitationController',
      templateUrl: 'dashboard/invitation/invitation.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.INVITATIONS'
      },
      resolve: {
        pendingInvitations: ($q, $state, ProfileApi, User, ServiceApi, proTopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfilesInvitations().$promise.then((profileInvitations) => {
              ServiceApi.postServicesTags({
                serviceIds: _.flatten(_.map(profileInvitations, (profile: any) => _.map(profile.services, 'id')))
              }).$promise.then((servicesTags) => {

                profileInvitations.forEach((profile) => {
                  profile.services.forEach((service) => {
                    service.details.tags = _.head(
                      _.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                  })
                })

                _deferred.resolve(profileInvitations)
              })
            }, () => {
              _deferred.resolve([])
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
        companyLogo: (AppServiceProviderImageResolver, pendingInvitations) => {
          if (pendingInvitations.length > 0) {
            return AppServiceProviderImageResolver.resolve(pendingInvitations[0].organizationDetails.logo)
          } else {
            return false
          }
        }
      }
    })
  }


  angular.module('profitelo.controller.dashboard.invitation', [
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.swaggerResources',
    'profitelo.components.invitations.company-profile',
    'profitelo.services.resolvers.app.service-provider-image-resolver',
    'profitelo.components.dashboard.invitation.pro-invitation-acceptance-box'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)

}())