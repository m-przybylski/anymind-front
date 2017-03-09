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

export class RecoverPasswordApi {
    protected basePath = 'https:///';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $http: ng.IHttpService, apiUrl?: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.basePath = apiUrl;
        }
    }

    /**
        * Create recover password
        * 
        * @param body New recover password
        */
    public postRecoverPasswordRoute = (body: models.PostRecoverPassword, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/recover-password';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordRoute.');
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
    /**
        * Verify email token
        * 
        * @param body Verify email token
        */
    public postRecoverPasswordVerifyEmailRoute = (body: models.PostRecoverPasswordVerifyEmailToken, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/recover-password/verify/email';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordVerifyEmailRoute.');
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
    /**
        * Verify Msisdn token
        * 
        * @param body Verify Msisdn token
        */
    public postRecoverPasswordVerifyMsisdnRoute = (body: models.PostRecoverPasswordVerifyMsisdnToken, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/recover-password/verify/msisdn';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postRecoverPasswordVerifyMsisdnRoute.');
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
    /**
        * Update password
        * 
        * @param body update password
        */
    public putRecoverPasswordEmailRoute = (body: models.PutRecoverPasswordEmail, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/recover-password/email';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling putRecoverPasswordEmailRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'PUT',
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
    /**
        * Update password
        * 
        * @param body update password
        */
    public putRecoverPasswordMsisdnRoute = (body: models.PutRecoverPasswordMsisdn, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/recover-password/msisdn';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling putRecoverPasswordMsisdnRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'PUT',
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

export class RecoverPasswordApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    public postRecoverPasswordRoute = (status: number, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/recover-password';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postRecoverPasswordVerifyEmailRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/recover-password/verify/email';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postRecoverPasswordVerifyMsisdnRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/recover-password/verify/msisdn';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public putRecoverPasswordEmailRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/recover-password/email';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public putRecoverPasswordMsisdnRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/recover-password/msisdn';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
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
