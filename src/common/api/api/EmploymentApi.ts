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

export class EmploymentApi {
    protected basePath = 'https:///';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $http: ng.IHttpService, apiUrl?: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.basePath = apiUrl;
        }
    }

    /**
        * Accept employment invitation
        * 
        * @param employmentId 
        */
    public postEmploymentsAcceptRoute = (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/employments/{employmentId}/accept'
            .replace('{' + 'employmentId' + '}', String(employmentId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'employmentId' is not null or undefined
        if (employmentId === null || employmentId === undefined) {
            throw new Error('Required parameter employmentId was null or undefined when calling postEmploymentsAcceptRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'POST',
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
        * Reject employment invitation
        * 
        * @param employmentId 
        */
    public postEmploymentsRejectRoute = (employmentId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/employments/{employmentId}/reject'
            .replace('{' + 'employmentId' + '}', String(employmentId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'employmentId' is not null or undefined
        if (employmentId === null || employmentId === undefined) {
            throw new Error('Required parameter employmentId was null or undefined when calling postEmploymentsRejectRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'POST',
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
        * Invite employees
        * 
        * @param body 
        */
    public postEmploymentsRoute = (body: models.PostEmployment, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/employments';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postEmploymentsRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'POST',
            url: localVarPath,
            data: body,
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

export class EmploymentApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    public postEmploymentsAcceptRoute = (status: number, employmentId: string, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/employments/{employmentId}/accept'
          .replace('{' + 'employmentId' + '}', String(employmentId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postEmploymentsRejectRoute = (status: number, employmentId: string, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/employments/{employmentId}/reject'
          .replace('{' + 'employmentId' + '}', String(employmentId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postEmploymentsRoute = (status: number, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/employments';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
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
