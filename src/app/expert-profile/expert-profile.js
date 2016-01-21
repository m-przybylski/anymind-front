function AccountsApiResolverFunction($q, SessionsApi, AccountsApi) {
  var deferred = $q.defer()
  SessionsApi.get().$promise.then((response) => {
    AccountsApi.query({telcoLogin: response.telcoLogin}).$promise.then((result) => {
      deferred.resolve(result)
    }, (error) => {
      deferred.reject(error)
    })
  }, (error) => {
    deferred.reject(error)
  })
  return deferred.promise
}

function ProfilesApiResolverFunction($q, ProfilesApi) {
  var deferred = $q.defer()
  ProfilesApi.get({profileId: '000000'}).$promise.then((profilesApiResponse) => {
    deferred.resolve(profilesApiResponse)
  }, (profilesApiError) => {
    deferred.reject(profilesApiError)
  })
  return deferred.promise
}

function createExpertProfileFirstTime(ProfilesApi) {
  var deferred = $q.defer()
  ProfilesApi.get({profileId: '000000'}).$promise.then((profilesApiResponse) => {
    deferred.resolve(profilesApiResponse)
  }, (profilesApiError) => {
    deferred.reject(profilesApiError)
  })
  return deferred.promise
}

function expertProfileController() {
  var vm = this

  vm.account        = {} // AccountsApiResolver
  vm.userProfile    = {} // ProfilesApiResolver
}

function config($stateProvider) {
  $stateProvider.state('app.expert-profile', {
    url: '/expert-profile',
    templateUrl:'expert-profile/expert-profile.tpl.html',
    controller:     expertProfileController,
    controllerAs:   'vm'
    // resolve: {
    //   AccountsApiResolver: AccountsApiResolverFunction
    //   ProfilesApiResolver: ProfilesApiResolverFunction
    // }
  })
}

angular.module('profitelo.controller.expert-profile', [
  'ui.router',
  'profitelo.api.accounts',
  'profitelo.api.sessions',
  'profitelo.api.profiles',
  'profitelo.directives.pro-expert-profile'
])
.config(config)

