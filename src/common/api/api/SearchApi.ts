/**
 * Profitelo API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from '../model/models';

/* tslint:disable:no-unused-variable member-ordering */

export class SearchApi {
    protected basePath = 'https:///';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $http: ng.IHttpService, apiUrl?: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.basePath = apiUrl;
        }
    }

    /**
        * Rebuild index
        * 
        */
    public searchReindexRoute = (extraHttpRequestParams?: any ) : ng.IPromise<string> => {
        const localVarPath = this.basePath + '/search/reindex';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let httpRequestParams: ng.IRequestConfig = {
            method: 'GET',
            url: localVarPath,
                                    params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
    }
    /**
        * Search for services
        * 
        * @param q Query
        * @param serviceName Title of service
        * @param profileName Name of profile
        * @param profileDesc Description of profile
        * @param tagId Comma-separated list of tag IDs
        * @param serviceCategoryId ID of category
        * @param profileType Type of profile
        * @param onlyAvailable Show only available experts
        * @param sortBy Sort (top, new, price, -price)
        * @param language Comma-separated list of languages
        * @param minPrice Min price
        * @param maxPrice Max price
        * @param offset Offset
        * @param limit Limit
        */
    public searchRoute = (q?: string, serviceName?: string, profileName?: string, profileDesc?: string, tagId?: string, serviceCategoryId?: string, profileType?: string, onlyAvailable?: string, sortBy?: string, language?: string, minPrice?: number, maxPrice?: number, offset?: number, limit?: number, extraHttpRequestParams?: any ) : ng.IPromise<models.SearchResult> => {
        const localVarPath = this.basePath + '/search';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        if (q !== undefined) {
            queryParameters['q'] = q;
        }

        if (serviceName !== undefined) {
            queryParameters['service.name'] = serviceName;
        }

        if (profileName !== undefined) {
            queryParameters['profile.name'] = profileName;
        }

        if (profileDesc !== undefined) {
            queryParameters['profile.desc'] = profileDesc;
        }

        if (tagId !== undefined) {
            queryParameters['tag.id'] = tagId;
        }

        if (serviceCategoryId !== undefined) {
            queryParameters['service.category.id'] = serviceCategoryId;
        }

        if (profileType !== undefined) {
            queryParameters['profile.type'] = profileType;
        }

        if (onlyAvailable !== undefined) {
            queryParameters['onlyAvailable'] = onlyAvailable;
        }

        if (sortBy !== undefined) {
            queryParameters['sortBy'] = sortBy;
        }

        if (language !== undefined) {
            queryParameters['language'] = language;
        }

        if (minPrice !== undefined) {
            queryParameters['minPrice'] = minPrice;
        }

        if (maxPrice !== undefined) {
            queryParameters['maxPrice'] = maxPrice;
        }

        if (offset !== undefined) {
            queryParameters['offset'] = offset;
        }

        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'GET',
            url: localVarPath,
                                    params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
    }
    /**
        * Get search suggestions
        * 
        * @param q Query
        * @param type Comma-separated list of suggestion types (terms, tags, services, experts, organizations)
        */
    public searchSuggestionsRoute = (q?: string, type?: string, extraHttpRequestParams?: any ) : ng.IPromise<models.SearchSuggestions> => {
        const localVarPath = this.basePath + '/search/suggestions';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        if (q !== undefined) {
            queryParameters['q'] = q;
        }

        if (type !== undefined) {
            queryParameters['type'] = type;
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'GET',
            url: localVarPath,
                                    params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams).then(response => {
            if (typeof response.data !== 'undefined') {
              return response.data
            }
            else {
              throw new Error('Response was not defined')
            }
          });
    }
}

export class SearchApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    public searchReindexRoute = (status: number, data?: string, err?: any): void => {
      const localVarPath = this.apiUrl + '/search/reindex';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public searchRoute = (status: number, q?: string, serviceName?: string, profileName?: string, profileDesc?: string, tagId?: string, serviceCategoryId?: string, profileType?: string, onlyAvailable?: string, sortBy?: string, language?: string, minPrice?: number, maxPrice?: number, offset?: number, limit?: number, data?: models.SearchResult, err?: any): void => {
      const localVarPath = this.apiUrl + '/search';

      const queryParameters: any = {}
      if (q !== undefined) {
        queryParameters['q'] = q;
      }
      if (serviceName !== undefined) {
        queryParameters['service.name'] = serviceName;
      }
      if (profileName !== undefined) {
        queryParameters['profile.name'] = profileName;
      }
      if (profileDesc !== undefined) {
        queryParameters['profile.desc'] = profileDesc;
      }
      if (tagId !== undefined) {
        queryParameters['tag.id'] = tagId;
      }
      if (serviceCategoryId !== undefined) {
        queryParameters['service.category.id'] = serviceCategoryId;
      }
      if (profileType !== undefined) {
        queryParameters['profile.type'] = profileType;
      }
      if (onlyAvailable !== undefined) {
        queryParameters['onlyAvailable'] = onlyAvailable;
      }
      if (sortBy !== undefined) {
        queryParameters['sortBy'] = sortBy;
      }
      if (language !== undefined) {
        queryParameters['language'] = language;
      }
      if (minPrice !== undefined) {
        queryParameters['minPrice'] = minPrice;
      }
      if (maxPrice !== undefined) {
        queryParameters['maxPrice'] = maxPrice;
      }
      if (offset !== undefined) {
        queryParameters['offset'] = offset;
      }
      if (limit !== undefined) {
        queryParameters['limit'] = limit;
      }
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public searchSuggestionsRoute = (status: number, q?: string, type?: string, data?: models.SearchSuggestions, err?: any): void => {
      const localVarPath = this.apiUrl + '/search/suggestions';

      const queryParameters: any = {}
      if (q !== undefined) {
        queryParameters['q'] = q;
      }
      if (type !== undefined) {
        queryParameters['type'] = type;
      }
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }

    private serializeQuery = (obj: any) => {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      const url = str.join("&")
      return (url.length >0) ? '?'+url : ''
    }
  }
