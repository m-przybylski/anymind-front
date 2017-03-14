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

export interface GetService {
    "ownerEmployee": boolean;
    "usageCounter": number;
    "id": string;
    "invitations": Array<models.ServiceInvitation>;
    "ownerId": string;
    "createdAt": number;
    "status": GetService.StatusEnum;
    "usageDurationInSeconds": number;
    "details"?: models.ServiceDetails;
    "rating": number;
}

export namespace GetService {
    export enum StatusEnum {
        NEW = <any> 'NEW',
        VERIFIED = <any> 'VERIFIED'
    }
}
