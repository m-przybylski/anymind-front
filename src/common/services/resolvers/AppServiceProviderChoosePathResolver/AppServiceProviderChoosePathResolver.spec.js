describe('Unit testing: profitelo.services.resolvers.app.service-provider-choose-path', () => {
  describe('for AppServiceProviderChoosePathResolver service >', () => {
    
    let url = 'awesomeURL'
    let mockState
    let AppServiceProviderChoosePathResolver
    let _ProfileApiDef
    let $httpBackend
    let resourcesExpectations
    let _timeout

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      module('profitelo.swaggerResources.definitions')

      module('profitelo.services.resolvers.app.service-provider-choose-path', function($provide) {
        $provide.value('$state', mockState)
      })

      inject(($injector) => {
        AppServiceProviderChoosePathResolver = $injector.get('AppServiceProviderChoosePathResolver')
        _ProfileApiDef = $injector.get('ProfileApiDef')
        _timeout = $injector.get('$timeout')
        $httpBackend = $injector.get('$httpBackend')
      })

      resourcesExpectations = {
        ProfileApi: {
          getProfile: $httpBackend.when(_ProfileApiDef.getProfile.method, _ProfileApiDef.getProfile.url)
        },
        User: {
          getStatus: $httpBackend.when('GET', 'http://api.webpage.com/session')
        }
      }
    })

    it('should have resolve function', () => {
      expect(AppServiceProviderChoosePathResolver.resolve).toBeDefined()
    })
    
    it('should redirect to app.dashboard.start', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {})

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
    })

    it('should redirect to app.dashboard.service-provider.company-path', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {
        expertDetails: null,
        organizataionDetails: {}
      })

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')
    })

    it('should redirect to app.dashboard.service-provider.individual-path', () => {
      spyOn(mockState, 'go')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(200, {
        expertDetails: {},
        organizataionDetails: null
      })

      AppServiceProviderChoosePathResolver.resolve()
      $httpBackend.flush()
      expect(mockState.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')
    })

    it('should not get profile', () => {
      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')
      resourcesExpectations.User.getStatus.respond(200, {
        apiKey: '1234',
        id: ':profileId'
      })
      resourcesExpectations.ProfileApi.getProfile.respond(300, {})

      AppServiceProviderChoosePathResolver.resolve().then((res)=> {
        expect(res).toBe(null)
        spy.spy()
      }, ()=> {
      })

      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })
/*
    it('should redirect on error', () => {
      let spy = {
        spy: () => {}
      }

      spyOn(spy, 'spy')
      resourcesExpectations.User.getStatus.respond(500)

      AppServiceProviderChoosePathResolver.resolve().then((res)=> {
      }, ()=> {
        spy.spy()
      })

      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })
*/
  })
})