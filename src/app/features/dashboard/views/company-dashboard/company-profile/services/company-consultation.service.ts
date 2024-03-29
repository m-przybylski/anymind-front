import { Injectable } from '@angular/core';
import {
  EmploymentService,
  GetInvitation,
  InvitationService,
  ProfileService,
  ServiceService,
  PaymentsService,
  GetServiceWithEmployees,
  GetDefaultPaymentMethod,
  GetCreditCard,
  GetCommissions,
  PostCommissions,
  FinancesService,
} from '@anymind-ng/api';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { map, switchMap, catchError } from 'rxjs/operators';
import { GetServiceWithInvitations } from '@anymind-ng/api/model/getServiceWithInvitations';
import { EMPTY, forkJoin, iif, of, Observable, throwError } from 'rxjs';
import { EmploymentWithExpertProfile } from '@anymind-ng/api/model/employmentWithExpertProfile';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { httpCodes } from '@platform/shared/constants/httpCodes';

export interface ICompanyConsultationDetails {
  tagsList: ReadonlyArray<string>;
  serviceDetails: GetServiceWithEmployees;
  employeesList: ReadonlyArray<ICompanyEmployeeRowComponent>;
  defaultPaymentMethod: GetDefaultPaymentMethod;
  creditCards: ReadonlyArray<GetCreditCard>;
  getCommissions: GetCommissions;
}

export interface ICompanyEmployeeRowComponent {
  name: string;
  id: string;
  usageCounter?: number;
  ratingCounter?: number;
  rating?: number;
  employeeId?: string;
  avatar?: string;
  // TODO remove email, msisdn, invitedExpertAccountId properties after https://anymind.atlassian.net/browse/PLAT-538
  email?: string;
  msisdn?: string;
  expertAccountId?: string;
}

@Injectable()
export class CompanyConsultationService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private employmentService: EmploymentService,
    private invitationService: InvitationService,
    private profileService: ProfileService,
    private paymentsService: PaymentsService,
    private financesService: FinancesService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CompanyConsultationService'));
  }

  public getConsultationDetails(serviceId: string): Observable<ICompanyConsultationDetails> {
    return forkJoin(
      this.getTags(serviceId),
      this.serviceService.postServiceWithEmployeesRoute({ serviceIds: [serviceId] }).pipe(
        map(getServiceWithEmployeesList =>
          getServiceWithEmployeesList.find(
            getServiceWithEmployees => getServiceWithEmployees.serviceDetails.id === serviceId,
          ),
        ),
        map(getServiceWithEmployees => {
          if (getServiceWithEmployees === undefined) {
            throw new Error('Not able to get service details');
          }

          return getServiceWithEmployees;
        }),
        switchMap(getServiceWithEmployees =>
          this.getCommission({
            amount: getServiceWithEmployees.serviceDetails.price,
            isFreelance: getServiceWithEmployees.serviceDetails.isFreelance,
          })
          .pipe(
            map(getCommissions => ({
              getServiceWithEmployees,
              getCommissions,
            })),
          ),
        ),
      ),
      this.getPaymentMethod(),
    ).pipe(
      map(
        ([
          tagsList,
          { getServiceWithEmployees, getCommissions },
          { defaultPaymentMethod, getCreditCard },
        ]): ICompanyConsultationDetails => ({
          tagsList,
          serviceDetails: getServiceWithEmployees,
          employeesList: getServiceWithEmployees.employeesDetails.map(employee => this.mapEmployeesList(employee)),
          defaultPaymentMethod,
          creditCards: getCreditCard,
          getCommissions,
        }),
      ),
      catchError(error => {
        this.loggerService.error('Can not get profile: ', error);

        return EMPTY;
      }),
    );
  }

  public deletePendingInvitation(invitationId: string): Observable<void> {
    return this.invitationService.deleteInvitationsRoute({ invitationsIds: [invitationId] });
  }

  public deleteEmployee(employmentId: string): Observable<void> {
    return this.employmentService.deleteEmploymentRoute(employmentId);
  }

  public getInvitations(serviceId: string): Observable<ReadonlyArray<ICompanyEmployeeRowComponent>> {
    return this.getPendingInvitation(serviceId).pipe(
      map(serviceWithInvitations => serviceWithInvitations[0].invitations),
      map((invitations: ReadonlyArray<GetInvitation>) =>
        invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW),
      ),
      switchMap(invitations => {
        const employeeInvites = invitations.filter(item => item.employeeId);
        const pendingInvitations = invitations
          .filter(item => typeof item.employeeId === 'undefined')
          .map(item => ({
            name: item.msisdn || item.email || '',
            id: item.id,
            // todo delete email, msisdn properties after https://anymind.atlassian.net/browse/PLAT-538
            email: item.email,
            msisdn: item.msisdn,
          }));

        return iif(
          () => employeeInvites.length > 0,
          forkJoin(
            employeeInvites.map(employeeInvite =>
              this.profileService.getProfileRoute(employeeInvite.employeeId as string).pipe(
                map(
                  (res: GetProfileWithDocuments): ICompanyEmployeeRowComponent => ({
                    name: res.profile.name,
                    id: employeeInvite.id,
                    avatar: res.profile.avatar,
                    employeeId: employeeInvite.employeeId,
                    expertAccountId: res.profile.accountId,
                  }),
                ),
              ),
            ),
          ),
          of([]),
        ).pipe(
          map(
            (
              employeeInvitations: ReadonlyArray<ICompanyEmployeeRowComponent>,
            ): ReadonlyArray<ICompanyEmployeeRowComponent> => [...employeeInvitations, ...pendingInvitations],
          ),
          catchError(error => {
            this.loggerService.error('Can not return employee and invitations object: ', error);

            return EMPTY;
          }),
        );
      }),
    );
  }

  private mapEmployeesList(employee: EmploymentWithExpertProfile): ICompanyEmployeeRowComponent {
    return {
      usageCounter: employee.usageCounter,
      ratingCounter: employee.ratingCounter,
      rating: employee.rating,
      id: employee.id,
      name: employee.employeeProfile.name,
      avatar: employee.employeeProfile.avatar,
      expertAccountId: employee.employeeProfile.accountId,
      employeeId: employee.employeeProfile.id,
    };
  }
  private getPendingInvitation(serviceId: string): Observable<ReadonlyArray<GetServiceWithInvitations>> {
    return this.serviceService.postServiceInvitationsRoute({ serviceIds: [serviceId] });
  }

  private getPaymentMethod(): Observable<IPaymentMethod> {
    return this.paymentsService.getDefaultPaymentMethodRoute().pipe(
      switchMap(defaultPaymentMethod =>
        defaultPaymentMethod.creditCardId !== undefined
          ? this.paymentsService.getCreditCardsRoute().pipe(
              map(getCreditCard => ({
                defaultPaymentMethod,
                getCreditCard,
              })),
            )
          : of({ defaultPaymentMethod, getCreditCard: [] }),
      ),
      catchError(() => of({ defaultPaymentMethod: {}, getCreditCard: [] })),
    );
  }

  private getCommission(servicePrice: PostCommissions): Observable<GetCommissions> {
    return this.financesService.postCommissionsRoute(servicePrice).pipe(
      // for not logged user
      catchError((err: HttpErrorResponse) => {
        if (err.status === httpCodes.unauthorized) {
          return of({
            profileAmount: {
              value: 0,
              currency: '',
            },
          });
        }

        return throwError(err);
      }),
    );
  }
  private getTags(serviceId: string): Observable<ReadonlyArray<string>> {
    return this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTag => getServiceTag.serviceId === serviceId)
            .reduce((tagsList, getServiceTags) => [...tagsList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );
  }
}
interface IPaymentMethod {
  defaultPaymentMethod: GetDefaultPaymentMethod;
  getCreditCard: ReadonlyArray<GetCreditCard>;
}
