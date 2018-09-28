import { Injectable } from '@angular/core';
import { InvitationService, ServiceService, GetService, MoneyDto, GetServiceGrossPrice } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, AlertService } from '@anymind-ng/core';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, forkJoin } from 'rxjs';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';

@Injectable()
export class AcceptRejectInvitatioService extends Logger {
  constructor(
    private invitationService: InvitationService,
    private alertService: AlertService,
    private serviceService: ServiceService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  /**
   * Fetch information from backend server following endpoints are involved:
   * GET /api/services/{serviceId}
   * GET /api/services/{serviceId}/gross-price
   * POST /api/services/tags {serviceIds:[serviceId]}
   * @param invitation invitation object where serviceId is require
   * @returns mapped details about service to display for the user
   */
  public getInvitationDetails = (invitation: IInvitation): Observable<IConsultationDetails> =>
    forkJoin(
      this.serviceService.getServiceRoute(invitation.serviceId),
      this.serviceService.getServiceGrossPriceRoute(invitation.serviceId),
      this.getTagsForService(invitation.serviceId),
    ).pipe(
      map(([service, price, tagList]: [GetService, GetServiceGrossPrice, ReadonlyArray<string>]) => ({
        isFreelance: service.isFreelance,
        price: service.price,
        grossPrice: price.price,
        serviceDescription: service.description,
        tagList,
      })),
    );

  /**
   * Accepts invitation. endpoint envolved
   * POST /api/invitations/{invitataionId}/accept
   * @param invitationId id of invitation to be accepted
   * @param activeModal modal to be closed
   * @returns Cold observable. Once subscribed triggers accept
   */
  public acceptInvitation = (invitataionId: string, activeModal: NgbActiveModal): Observable<void> =>
    this.acceptRejectInvitation('ACCEPT')(invitataionId, activeModal);

  /**
   * Rejects invitation. endpoint envolved
   * POST /api/invitations/{invitataionId}/reject
   * @param invitationId id of invitation to be rejected
   * @param activeModal modal to be closed
   * @returns Cold observable. Once subscribed triggers rejection
   */
  public rejectInvitation = (invitataionId: string, activeModal: NgbActiveModal): Observable<void> =>
    this.acceptRejectInvitation('REJECT')(invitataionId, activeModal);

  public markInvitationAsRead = (invitation: string): Observable<void> =>
    this.invitationService.postInvitationsDisplayedRoute(invitation);

  private getTagsForService = (serviceId: string): Observable<ReadonlyArray<string>> =>
    this.serviceService
      .postServicesTagsRoute({ serviceIds: [serviceId] })
      .pipe(
        map(getServiceTagsList =>
          getServiceTagsList
            .filter(getServiceTagList => getServiceTagList.serviceId === serviceId)
            .reduce((tagList, getServiceTags) => [...tagList, ...getServiceTags.tags.map(tag => tag.name)], []),
        ),
      );

  private acceptRejectInvitation = (
    task: 'ACCEPT' | 'REJECT',
  ): ((invitataionId: string, activeModal: NgbActiveModal) => Observable<void>) => {
    /**
     * bind is required so the service has a context of execution.
     */
    const acceptReject =
      task === 'ACCEPT'
        ? this.invitationService.postInvitationAcceptRoute.bind(this.invitationService)
        : this.invitationService.postInvitationRejectRoute.bind(this.invitationService);

    return (invitataionId: string, activeModal: NgbActiveModal): Observable<void> =>
      acceptReject(invitataionId).pipe(
        tap(() => {
          activeModal.close(invitataionId);
          this.alertService.pushSuccessAlert(`INVITE_ACCEPT_REJECT.${task}.SUCCESS`);
        }),
        catchError((error: HttpErrorResponse) => {
          this.loggerService.warn('Something went wrong with accepting invitation', error);
          this.alertService.pushDangerAlert(`INVITE_ACCEPT_REJECT.${task}.FAILURE`);

          return throwError(error);
        }),
      );
  };
}

export interface IConsultationDetails {
  isFreelance: boolean;
  price: MoneyDto;
  grossPrice: MoneyDto;
  serviceDescription: string;
  tagList: ReadonlyArray<string>;
}