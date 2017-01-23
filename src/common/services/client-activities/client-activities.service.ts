module profitelo.services.clientActivities {

  // TODO define type for result and queryParams
  export interface IClientActivitiesService {
    resolve(): ng.IPromise<any>
    setClientActivitiesParam(params: any): ng.IPromise<any>
    getMoreResults(offset: number): ng.IPromise<any>
    onQueryParamsChange(scope: ng.IScope, callback: (queryParams: any) => void): void
    onActivitiesResults(scope: ng.IScope, callback: (err: string, results: any, queryParams: any) => void): void
    clearQueryParam(): void
  }

  class ClientActivitiesService implements IClientActivitiesService {

    private _queryParams
    private static _activityTypeOptions = ['SERVICE_USAGE_EVENT', 'FINANCIAL_TRANSACTION']

    private static _queryLimit = 11

    private static activitiesResultsEvent = 'activities-results'
    private static queryParamsEvent = 'activities-query-params'

    constructor(private $q: ng.IQService, private $rootScope: ng.IRootScopeService, private ViewsApi, private User) {

      this._queryParams = {}
      this._defineQueryProperties(this._queryParams)
    }

    private _handleClientActivitiesResponse = (response) => {

      return {
        activities: response.activities,
        activityTypes: response.activityTypes,
        balance: response.balance,
        expertServiceTuples: response.expertServiceTuples
      }
    }

    private _handleClientActivitiesResponseError = (error) =>
      this.$q.reject(error)

    private _searchClientActivities = (queryParam) =>
      this.ViewsApi.getDashboardClientActivities(queryParam).$promise

    public clearQueryParam = () => {
      angular.forEach(Object.keys(this._queryParams), (fieldName) => {
        if (this._queryParams.hasOwnProperty(fieldName)) {
          this._queryParams[fieldName] = void 0
        }
      })
    }

    public resolve = () => {
      this._queryParams['offset'] = '0'
      this._queryParams['limit'] = ClientActivitiesService._queryLimit
      return this._searchClientActivities(this._queryParams)
      .then(this._handleClientActivitiesResponse, this._handleClientActivitiesResponseError)
    }

    public setClientActivitiesParam = (filterObject) => {
      if (filterObject && typeof filterObject === 'object') {

        angular.forEach(Object.keys(this._queryParams), (fieldName) => {
          if (filterObject.hasOwnProperty(fieldName)) {
            this._queryParams[fieldName] = filterObject[fieldName]
          } else {
            this._queryParams[fieldName] = null
          }
        })

        this._queryParams['offset'] = 0
        this._queryParams['limit'] = ClientActivitiesService._queryLimit

        this._searchClientActivities(this._queryParams).then((response) => {
          this._notifyOnQueryParams(this._queryParams)
          this._notifyOnActivitiesResults(null, response, this._queryParams)
          return this.$q.resolve(response)
        }, (error) => {
          this._notifyOnActivitiesResults(error, null, this._queryParams)
          return this.$q.reject(error)
        })
      } else {
        return this.$q.reject({
          errorMessage: 'Expect parameter to exist and to be an object'
        })
      }
    }

    private _notifyOnActivitiesResults = (err, results, queryParams) => {
      this.$rootScope.$emit(ClientActivitiesService.activitiesResultsEvent, err, results, queryParams)
    }

    private _notifyOnQueryParams = (queryParams) => {
      this.$rootScope.$emit(ClientActivitiesService.queryParamsEvent, queryParams)
    }

    public onActivitiesResults = (scope: ng.IScope,
                                  callback: (err: string, results: any, queryParams: any) => void) => {
      scope.$on(
        '$destroy',
        this.$rootScope.$on(ClientActivitiesService.activitiesResultsEvent,
          (_, err, results, queryParams) => callback(err, results, queryParams))
      )
    }

    public onQueryParamsChange = (scope: ng.IScope, callback: (data: any) => void) => {
      scope.$on(
        '$destroy',
        this.$rootScope.$on(ClientActivitiesService.queryParamsEvent, (_, results) => callback(results))
      )
      this._notifyOnQueryParams(this._queryParams)
    }

    public getMoreResults = (offset: number) => {
      this._queryParams['offset'] = offset
      this._queryParams['limit'] = ClientActivitiesService._queryLimit

      return this._searchClientActivities(this._queryParams).then((response) => {
        this._notifyOnQueryParams(this._queryParams)
        this._notifyOnActivitiesResults(null, response, this._queryParams)
        return this.$q.resolve(response)
      }, (error) => {
        this._notifyOnActivitiesResults(error, null, this._queryParams)
        return this.$q.reject(error)
      })
    }

    private _defineQueryProperties = (obj) => {
      return Object.defineProperties(obj, {
        areDirty: {
          enumerable: false,
          writable: true,
          value: undefined
        },

        _activityType: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        activityType: {
          enumerable: true,
          get: function () {
            return this._activityType
          },
          set: function (v) {
            v = ClientActivitiesService._activityTypeOptions.indexOf(v) !== -1 ? String(v) : undefined
            if (v !== this._activityType) {
              this.areDirty = true
              this._activityType = v
            }
          }
        },

        _profileId: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        profileId: {
          enumerable: true,
          get: function () {
            return this._profileId
          },
          set: function (v) {
            v = v ? String(v) : undefined
            if (v !== this._profileId) {
              this.areDirty = true
              this._profileId = v
              if (angular.isDefined(v)) {
                this._activityType = ClientActivitiesService._activityTypeOptions[0]
              }
            }
          }
        },

        _serviceId: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        serviceId: {
          enumerable: true,
          get: function () {
            return this._serviceId
          },
          set: function (v) {
            v = v ? String(v) : undefined
            if (v !== this._serviceId) {
              this.areDirty = true
              this._serviceId = v
              if (angular.isDefined(v)) {
                this._activityType = ClientActivitiesService._activityTypeOptions[0]
              }
            }
          }
        },

        _dateFrom: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        dateFrom: {
          enumerable: true,
          get: function () {
            return this._dateFrom
          },
          set: function (v) {
            v = v instanceof Date ? v : undefined
            if (v !== this._dateFrom) {
              this.areDirty = true
              this._dateFrom = v
            }
          }
        },

        _dateTo: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        dateTo: {
          enumerable: true,
          get: function () {
            return this._dateTo
          },
          set: function (v) {
            v = v instanceof Date ? v : undefined
            if (v !== this._dateTo) {
              if (angular.isDefined(v)) {
                //TODO It will not working with time zones
                v.setHours(23, 59, 59, 999)
              }
              this.areDirty = true
              this._dateTo = v
            }
          }
        },

        _limit: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        limit: {
          enumerable: true,
          get: function () {
            return this._limit
          },
          set: function (v) {
            v = v > 0 ? Number(v) : 0
            if (v !== this._limit) {
              this.areDirty = true
              this._limit = v
            }
          }
        },

        _offset: {
          enumerable: false,
          writable: true,
          value: undefined
        },
        offset: {
          enumerable: true,
          get: function () {
            return this._offset
          },
          set: function (v) {
            v = v > 0 ? Number(v) : 0
            if (v !== this._offset) {
              this.areDirty = true
              this._offset = v
            }
          }
        }

      })
    }
  }

  angular.module('profitelo.services.client-activities-service', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .service('clientActivitiesService', ClientActivitiesService)
}