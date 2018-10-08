import { InjectionToken, Provider } from '@angular/core';

export const COMMISSION: InjectionToken<ICommission> = new InjectionToken('Commission injection token');

export interface ICommission {
  freelanceConsultationAnyMindCommission: number;
  freelanceConsultationCompanyCommission: number;
  employeeServiceAnyMindCommission: number;
  percentDivider: number;
  numberPrecision: number;
}

// tslint:disable-next-line:only-arrow-functions
export function provideCommission(): Provider {
  return {
    provide: COMMISSION,
    useValue: {
      freelanceConsultationAnyMindCommission: 0.2,
      freelanceConsultationCompanyCommission: 0.1,
      employeeServiceAnyMindCommission: 0.15,
      percentDivider: 100,
      numberPrecision: 2,
    },
  };
}