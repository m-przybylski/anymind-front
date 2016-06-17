(function() {
  function AppServiceProviderImageResolver($q, proTopAlertService, FilesApi) {

    let _resolve = (token) => {
      let _deferred = $q.defer()
      if (token !== null) {
        FilesApi.fileInfoPath({
          token: token
        }).$promise.then((response)=> {
          _deferred.resolve(response.meta.downloadUrl)
        }, () => {
          _deferred.resolve(null)
        }, (error) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
        return _deferred.promise

      } else {
        return ''
      }

    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.service-provider-image-resolver', [
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
    .service('AppServiceProviderImageResolver', AppServiceProviderImageResolver)

}())
