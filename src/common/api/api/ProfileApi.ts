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

models;

/* tslint:disable:no-unused-variable member-ordering */

export class ProfileApi {
    protected basePath = 'https:///';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $http: ng.IHttpService, apiUrl?: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.basePath = apiUrl;
        }
    }

    /**
        * Remove profile from favourites
        * 
        * @param profileId profileId
        */
    public deleteProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/favourite/expert'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling deleteProfileFavouriteExpertRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'DELETE',
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
        * Remove profile from favourites
        * 
        * @param profileId profileId
        */
    public deleteProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/favourite/organization'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling deleteProfileFavouriteOrganizationRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'DELETE',
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
        * Get user employers profiles with services
        * 
        * @param profileId profileId
        */
    public getEmployersProfilesWithServicesRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<Array<models.GetProfileWithServices>> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/employers/services'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling getEmployersProfilesWithServicesRoute.');
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
        * Get Details of profile
        * 
        * @param profileId profileId
        */
    public getProfileRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<models.GetProfile> => {
        const localVarPath = this.basePath + '/profiles/{profileId}'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling getProfileRoute.');
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
        * Get Details of profile with services
        * 
        * @param profileId profileId
        */
    public getProfileWithServicesRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<models.GetProfileWithServices> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/services'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling getProfileWithServicesRoute.');
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
        * Get all invitations
        * 
        */
    public getProfilesInvitationsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<models.GetProfileWithServicesEmployments>> => {
        const localVarPath = this.basePath + '/profiles/invitations';

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
        * Patch profile
        * 
        * @param body Updated profile
        */
    public patchProfileRoute = (body: models.UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/profiles';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling patchProfileRoute.');
        }
        let httpRequestParams: ng.IRequestConfig = {
            method: 'PATCH',
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
        * Add profile to favourites
        * 
        * @param profileId profileId
        */
    public postProfileFavouriteExpertRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/favourite/expert'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling postProfileFavouriteExpertRoute.');
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
        * Add profile to favourites
        * 
        * @param profileId profileId
        */
    public postProfileFavouriteOrganizationRoute = (profileId: string, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/profiles/{profileId}/favourite/organization'
            .replace('{' + 'profileId' + '}', String(profileId));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'profileId' is not null or undefined
        if (profileId === null || profileId === undefined) {
            throw new Error('Required parameter profileId was null or undefined when calling postProfileFavouriteOrganizationRoute.');
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
        * Add profile
        * 
        * @param body New profile
        */
    public postProfileRoute = (body: models.PostProfile, extraHttpRequestParams?: any ) : ng.IPromise<models.GetProfile> => {
        const localVarPath = this.basePath + '/profiles';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postProfileRoute.');
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
        * PUT profile
        * 
        * @param body Updated profile
        */
    public putProfileRoute = (body: models.UpdateProfile, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/profiles';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling putProfileRoute.');
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

export class ProfileApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    public deleteProfileFavouriteExpertRoute = (status: number, profileId: string, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public deleteProfileFavouriteOrganizationRoute = (status: number, profileId: string, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getEmployersProfilesWithServicesRoute = (status: number, profileId: string, data?: Array<models.GetProfileWithServices>, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/employers/services'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getProfileRoute = (status: number, profileId: string, data?: models.GetProfile, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getProfileWithServicesRoute = (status: number, profileId: string, data?: models.GetProfileWithServices, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/services'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getProfilesInvitationsRoute = (status: number, data?: Array<models.GetProfileWithServicesEmployments>, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/invitations';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public patchProfileRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPATCH(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postProfileFavouriteExpertRoute = (status: number, profileId: string, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/expert'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postProfileFavouriteOrganizationRoute = (status: number, profileId: string, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles/{profileId}/favourite/organization'
          .replace('{' + 'profileId' + '}', String(profileId));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postProfileRoute = (status: number, data?: models.GetProfile, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public putProfileRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/profiles';

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
