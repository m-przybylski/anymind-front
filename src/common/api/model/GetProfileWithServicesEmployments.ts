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

export interface GetProfileWithServicesEmployments {
    "organizationDetails"?: models.OrganizationDetails;
    "services": Array<models.GetServiceWithEmployments>;
    "expertDetails"?: models.ExpertDetails;
    "isActive": boolean;
    "id": string;
}

