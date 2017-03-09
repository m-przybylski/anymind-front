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

export class PaymentsApi {
    protected basePath = 'https:///';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $http: ng.IHttpService, apiUrl?: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.basePath = apiUrl;
        }
    }

    /**
        * Add new payment method
        * 
        * @param body Braintree payment method
        */
    public addPaymentMethodRoute = (body: models.AddNewPaymentMethod, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addPaymentMethodRoute.');
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
        * Create Braintree payment method transaction
        * 
        * @param cardToken token
        * @param body Amount
        */
    public createPaymentMethodTransactionRoute = (cardToken: string, body: models.PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods/{cardToken}/transaction'
            .replace('{' + 'cardToken' + '}', String(cardToken));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'cardToken' is not null or undefined
        if (cardToken === null || cardToken === undefined) {
            throw new Error('Required parameter cardToken was null or undefined when calling createPaymentMethodTransactionRoute.');
        }
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createPaymentMethodTransactionRoute.');
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
        * Create PayPal payment
        * 
        * @param body Create payment
        */
    public createPaymentPathRoute = (body: models.CreatePayment, extraHttpRequestParams?: any ) : ng.IPromise<models.GetPayment> => {
        const localVarPath = this.basePath + '/payments/paypal/create-payment';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createPaymentPathRoute.');
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
        * Create Braintree transaction
        * 
        * @param body Braintree transaction
        */
    public createTransactionRoute = (body: models.PostTransaction, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/transaction';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createTransactionRoute.');
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
        * Delete payment method
        * 
        * @param cardToken token
        */
    public deletePaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods/{cardToken}'
            .replace('{' + 'cardToken' + '}', String(cardToken));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'cardToken' is not null or undefined
        if (cardToken === null || cardToken === undefined) {
            throw new Error('Required parameter cardToken was null or undefined when calling deletePaymentMethodRoute.');
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
        * Execute PayPal payment
        * 
        * @param body Execute payment
        */
    public executePaymentPathRoute = (body: models.PayPalExecutePayment, extraHttpRequestParams?: any ) : ng.IPromise<models.GetPayment> => {
        const localVarPath = this.basePath + '/payments/paypal/execute-payment';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling executePaymentPathRoute.');
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
        * Generate a Braintree Client Token
        * 
        */
    public getClientTokenRoute = (extraHttpRequestParams?: any ) : ng.IPromise<models.ClientToken> => {
        const localVarPath = this.basePath + '/payments/braintree';

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
        * Get list of credit cards
        * 
        */
    public getCreditCardsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<models.GetCreditCard>> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods/credit-cards';

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
        * Get payu payment links
        * 
        */
    public getPayUPaymentLinksRoute = (extraHttpRequestParams?: any ) : ng.IPromise<Array<models.PaymentLink>> => {
        const localVarPath = this.basePath + '/payments/payu/payment-links';

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
        * Get payment options
        * 
        */
    public getPaymentOptionsRoute = (extraHttpRequestParams?: any ) : ng.IPromise<models.GetPaymentOptions> => {
        const localVarPath = this.basePath + '/payments/options';

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
        * Payu notify
        * 
        * @param body Notify request
        */
    public postPayUNotifyRoute = (body: string, extraHttpRequestParams?: any ) : ng.IPromise<{}> => {
        const localVarPath = this.basePath + '/payments/payu/notification';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postPayUNotifyRoute.');
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
        * Create order
        * 
        * @param body Order request
        */
    public postPayUOrderRoute = (body: models.PostOrder, extraHttpRequestParams?: any ) : ng.IPromise<models.GetOrder> => {
        const localVarPath = this.basePath + '/payments/payu/order';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postPayUOrderRoute.');
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
        * Update credit card limit
        * 
        * @param body New credit card limit
        */
    public putCreditCardLimitRoute = (body: models.PutCreditCardLimit, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods/{cardToken}/limit';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling putCreditCardLimitRoute.');
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
        * Set payment method as default
        * 
        * @param cardToken token
        */
    public setDefaultPaymentMethodRoute = (cardToken: string, extraHttpRequestParams?: any ) : ng.IPromise<models.JValue> => {
        const localVarPath = this.basePath + '/payments/braintree/payment-methods/{cardToken}/set-default'
            .replace('{' + 'cardToken' + '}', String(cardToken));

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'cardToken' is not null or undefined
        if (cardToken === null || cardToken === undefined) {
            throw new Error('Required parameter cardToken was null or undefined when calling setDefaultPaymentMethodRoute.');
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
}

export class PaymentsApiMock {
    apiUrl = ''
    static $inject: string[] = ['$httpBackend', 'apiUrl', '$httpParamSerializer'];

    constructor(protected $httpBackend: ng.IHttpBackendService, apiUrl: string, protected $httpParamSerializer?: (d: any) => any) {
        if (apiUrl !== undefined) {
            this.apiUrl = apiUrl;
        }
    }

    public addPaymentMethodRoute = (status: number, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public createPaymentMethodTransactionRoute = (status: number, cardToken: string, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/transaction'
          .replace('{' + 'cardToken' + '}', String(cardToken));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public createPaymentPathRoute = (status: number, data?: models.GetPayment, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/paypal/create-payment';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public createTransactionRoute = (status: number, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/transaction';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public deletePaymentMethodRoute = (status: number, cardToken: string, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}'
          .replace('{' + 'cardToken' + '}', String(cardToken));

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenDELETE(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public executePaymentPathRoute = (status: number, data?: models.GetPayment, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/paypal/execute-payment';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getClientTokenRoute = (status: number, data?: models.ClientToken, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getCreditCardsRoute = (status: number, data?: Array<models.GetCreditCard>, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/credit-cards';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getPayUPaymentLinksRoute = (status: number, data?: Array<models.PaymentLink>, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/payu/payment-links';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public getPaymentOptionsRoute = (status: number, data?: models.GetPaymentOptions, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/options';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenGET(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postPayUNotifyRoute = (status: number, data?: {}, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/payu/notification';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public postPayUOrderRoute = (status: number, data?: models.GetOrder, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/payu/order';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPOST(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public putCreditCardLimitRoute = (status: number, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/limit';

      const queryParameters: any = {}
      const queryUrl = this.serializeQuery(queryParameters)

      this.$httpBackend.whenPUT(localVarPath+queryUrl)
        .respond(status, (typeof err !== 'undefined') ? err : data)
    }
    public setDefaultPaymentMethodRoute = (status: number, cardToken: string, data?: models.JValue, err?: any): void => {
      const localVarPath = this.apiUrl + '/payments/braintree/payment-methods/{cardToken}/set-default'
          .replace('{' + 'cardToken' + '}', String(cardToken));

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
