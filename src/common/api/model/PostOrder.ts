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

models;

export interface PostOrder {
    "firstName": string;
    "continueUrl"?: string;
    "payMethodValue": string;
    "payment": models.PostPayment;
    "lastName": string;
    "email": string;
}

