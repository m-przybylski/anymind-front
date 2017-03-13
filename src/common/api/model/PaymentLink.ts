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

import * as models from './models';

export interface PaymentLink {
    "value": string;
    "status": PaymentLink.StatusEnum;
    "name": string;
    "brandImageUrl": string;
}

export namespace PaymentLink {
    export enum StatusEnum {
        ENABLED = <any> 'ENABLED',
        DISABLED = <any> 'DISABLED',
        TEMPORARYDISABLED = <any> 'TEMPORARY_DISABLED'
    }
}
