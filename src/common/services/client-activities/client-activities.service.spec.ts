namespace profitelo.services.clientActivities {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IViewsApi = profitelo.api.IViewsApi

  describe('Unit testing: profitelo.services.client-activities-service >', () => {
    describe('for profitelo.services.client-activities-service >', () => {

      let clientActivitiesService: IClientActivitiesService

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {
        angular.mock.module('commonConfig')
        angular.mock.module('profitelo.services.client-activities-service')
      })

      beforeEach(inject(($injector: ng.auto.IInjectorService) => {
        clientActivitiesService = $injector.get<IClientActivitiesService>('clientActivitiesService')
      }))

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should authenticate', inject(($q: ng.IQService, $rootScope: IRootScopeService, ViewsApi: IViewsApi) => {

        ViewsApi.getDashboardClientActivitiesRoute = () => {
          return $q.resolve({})
        }

        spyOn(ViewsApi, 'getDashboardClientActivitiesRoute').and.callThrough()
        clientActivitiesService.resolve()
        $rootScope.$digest()
        expect(ViewsApi.getDashboardClientActivitiesRoute).toHaveBeenCalled()
      }))

      it('setClientActivitiesParam', () => {
        const filterObject = {
          offset: 0,
          limit: 11
        }

        clientActivitiesService.setClientActivitiesParam(filterObject)
      })

      it('should clearQueryParam', () => {
        let queryParams = {
          fieldName: 'undefined'
        }

        spyOn(queryParams, 'fieldName')

        clientActivitiesService.clearQueryParam()

        expect(clientActivitiesService.clearQueryParam).toBeDefined()
      })

      it('should getMoreResults', () => {
        clientActivitiesService.getMoreResults(1)
      })
    })
  })
}