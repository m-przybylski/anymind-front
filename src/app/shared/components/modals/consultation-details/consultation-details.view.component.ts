// tslint:disable:max-file-line-count
import {
  Component,
  ComponentRef,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import {
  ConsultationDetailsActionsService,
  IConsultationDetailActionParameters,
} from './consultation-details-actions.service';
import { forkJoin, Subject } from 'rxjs';
import { EmploymentWithExpertProfile, GetComment, GetProfile, GetSessionWithAccount } from '@anymind-ng/api';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { IConsultationFooterData, IFooterOutput } from './consultation-footers/consultation-footer-helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ConsultationFooterResolver,
  IFooterResolverPayload,
} from './consultation-footers/consultation-footer.resolver';
import { ICreateEditConsultationPayload } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { ServiceWithOwnerProfile } from '@anymind-ng/api/model/serviceWithOwnerProfile';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, SeoService } from '@anymind-ng/core';

export const EXPERT_ID = new InjectionToken<string>('Expert id');
export const SERVICE_ID = new InjectionToken<string>('Consultation id');
export const EXPERT_ACCOUNT_ID = new InjectionToken<string>('Expert account id');
export const USER_TYPE = new InjectionToken<UserTypeEnum>('User type');

@Component({
  selector: 'plat-consultation-details-view',
  templateUrl: './consultation-details.view.component.html',
  styleUrls: ['./consultation-details.view.component.sass'],
})
export class ConsultationDetailsModalComponent extends Logger implements OnInit, OnDestroy {
  public readonly avatarSize96: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public readonly modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.NO_PADDING;

  public serviceName: string;
  public serviceDescription: string;
  public registeredAt: Date;
  public tagList: ReadonlyArray<string> = [];
  public expertName: string;
  public companyName: string;
  public companyLogo: string;
  public expertAvatar: string;
  public usageCounter: number;
  public commentCounter: number;
  public ratingCounter: number;
  public commentsConsultation: ReadonlyArray<GetComment> = [];
  public employmentId: string;
  public isLoadMoreCommentsBtnVisible = false;
  public isCommentsRequestPending = false;
  public isPending = true;
  public accountId: string;
  public isOwner: boolean;

  @ViewChild('footerContainer', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;

  private readonly commentsMinLimitLength = 3;
  private readonly commentsLimitLength = 10;
  private destroyed$ = new Subject<void>();
  private footerComponent: ComponentRef<IFooterOutput> | undefined;
  private editConsultationPayload: ICreateEditConsultationPayload;
  private profileId: string;
  private expertAccountId: string;

  constructor(
    @Inject(EXPERT_ID) private expertId: string,
    @Inject(SERVICE_ID) private serviceId: string,
    @Optional() @Inject(USER_TYPE) private userType: UserTypeEnum = UserTypeEnum.USER,
    private store: Store<fromCore.IState>,
    private seoService: SeoService,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private consultationDetailsActionsService: ConsultationDetailsActionsService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationDetailsViewComponent'));

    this.store
      .pipe(
        select(fromCore.getSessionAndUserType),
        filter(({ getSession }) => typeof getSession !== 'undefined'),
      )
      .subscribe(({ getSession, getUserType }: { getSession: GetSessionWithAccount; getUserType: UserTypeEnum }) => {
        this.userType = this.userType || getUserType;
        this.profileId =
          this.userType === UserTypeEnum.COMPANY
            ? getSession.session.organizationProfileId || ''
            : this.userType === UserTypeEnum.EXPERT
            ? getSession.session.expertProfileId || ''
            : '';
      });
  }

  public ngOnInit(): void {
    forkJoin(
      this.store.pipe(
        select(fromCore.getSession),
        take(1),
      ),
      this.consultationDetailsViewService.getServicesTagList(this.serviceId),
      this.consultationDetailsViewService.getServiceDetails(this.serviceId, this.expertId),
      this.consultationDetailsViewService.getExpertAvailability(this.expertId),
    ).subscribe(([getSession, tags, getServiceDetails, expertIsAvailable]) => {
      if (getSession !== undefined) {
        this.expertAccountId = getServiceDetails.expertProfileViewDetails.expertProfile.accountId;
        this.accountId = getSession.account.id;
        this.isOwner = this.expertId === this.accountId;
      }
      this.seoService.updateTags({
        title: getServiceDetails.getServiceWithEmployees.serviceDetails.name,
        description: getServiceDetails.getServiceWithEmployees.serviceDetails.description,
      });
      this.tagList = tags;
      this.assignExpertConsultationDetails(getServiceDetails);
      this.assignEditConsultationPayload(getServiceDetails);
      this.footerComponent = this.attachFooter(
        this.accountId,
        getServiceDetails,
        expertIsAvailable,
        this.expertId,
        getSession,
      );
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (this.footerComponent) {
      this.footerComponent.destroy();
    }
  }

  public onAddAnswer(comment: GetComment): void {
    this.commentsConsultation = this.consultationDetailsViewService.addTemporaryComment(
      comment,
      this.commentsConsultation,
    );
  }

  public onLoadMoreComments(): void {
    const commentOffset = this.commentsConsultation.length;
    this.isCommentsRequestPending = true;

    this.consultationDetailsViewService
      .getComments(this.employmentId, this.commentsLimitLength.toString(), commentOffset.toString())
      .subscribe((commentsList: ReadonlyArray<GetComment>) => {
        this.isLoadMoreCommentsBtnVisible = commentsList.length === this.commentsLimitLength;
        this.isCommentsRequestPending = false;
        this.commentsConsultation = this.consultationDetailsViewService.loadMoreComments(
          commentsList,
          this.commentsConsultation,
        );
      });
  }

  private assignExpertConsultationDetails({
    expertOrOrganizationDetails,
    expertProfileViewDetails,
    getServiceWithEmployees,
    getComments,
    employmentId,
  }: IConsultationDetails): void {
    this.serviceName = getServiceWithEmployees.serviceDetails.name;
    this.serviceDescription = getServiceWithEmployees.serviceDetails.description;
    this.registeredAt = getServiceWithEmployees.serviceDetails.createdAt;
    this.employmentId = employmentId;

    if (expertOrOrganizationDetails.profile.profileType === GetProfile.ProfileTypeEnum.ORG) {
      this.companyName = expertOrOrganizationDetails.profile.name;
      this.companyLogo = expertOrOrganizationDetails.profile.avatar;
    }
    if (expertOrOrganizationDetails.profile.profileType === GetProfile.ProfileTypeEnum.EXP) {
      this.expertName = expertOrOrganizationDetails.profile.name;
      this.expertAvatar = expertOrOrganizationDetails.profile.avatar;
    }

    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.isPending = false;

    this.expertName = expertProfileViewDetails.expertProfile.name;
    this.expertAvatar = expertProfileViewDetails.expertProfile.avatar;

    const employmentWithService = expertProfileViewDetails.employments.find(
      service => service.serviceDetails.id === this.serviceId,
    );

    this.commentsConsultation = getComments;
    this.isLoadMoreCommentsBtnVisible = getComments.length === this.commentsMinLimitLength;

    if (employmentWithService !== undefined) {
      this.usageCounter = employmentWithService.usageCounter;
      this.commentCounter = employmentWithService.commentCounter;
      this.ratingCounter = employmentWithService.ratingCounter;
    }
  }

  private attachFooter(
    userAccountId: string,
    getServiceDetails: IConsultationDetails,
    expertIsAvailable: boolean,
    selectedExpertId: string,
    getSession?: GetSessionWithAccount,
  ): ComponentRef<IFooterOutput> | undefined {
    const resolverPayload: IFooterResolverPayload = {
      userType: this.userType,
      userAccountId: getSession && getSession.session.accountId,
      userExpertProfileId: getSession && getSession.session.expertProfileId,
      userOrganizationProfileId: getSession && getSession.session.organizationProfileId,
      serviceOwnerProfileId: getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.id,
      expertProfileIdList: [selectedExpertId],
    };
    const component = ConsultationFooterResolver.resolve(resolverPayload);
    if (component) {
      const footerComponent = this.consultationDetailsViewService.attachFooter(
        component,
        this.viewContainerRef,
        this.buildFooterData(userAccountId, getServiceDetails, expertIsAvailable, selectedExpertId),
      );

      footerComponent.instance.actionTaken$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        const initialPayload: IConsultationDetailActionParameters = {
          serviceId: this.serviceId,
          modal: this.activeModal,
          employmentId: this.employmentId,
          expertId: this.expertId,
          defaultPaymentMethod: getServiceDetails.defaultPaymentMethod,
          expertAccountId: this.expertAccountId,
          createEditConsultationPayload: this.editConsultationPayload,
        };

        /**
         * This is consultation details view, but it may happen that we are still in organization context
         * To determine if service belongs to organization we need to check if following field is populated
         * GetServiceWithEmployees -> (serviceDetails: ServiceWithOwnerProfile) -> (ownerProfile: GetProfile)
         * -> ownerProfile.profileType !== GetProfile.ProfileTypeEnum.ORG
         * Once we are in context of organization we need to remove expertID from sharing consultation.
         */
        const payload =
          getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.profileType !==
            GetProfile.ProfileTypeEnum.ORG && value === 'share'
            ? { ...initialPayload, expertId: undefined }
            : initialPayload;

        this.consultationDetailsActionsService[value].call(this.consultationDetailsActionsService, payload);
      });

      return footerComponent;
    }

    return undefined;
  }

  private assignEditConsultationPayload(consultationDetails: IConsultationDetails): void {
    this.editConsultationPayload = {
      profileId: this.profileId,
      isExpertConsultation: this.isExpertConsultation(consultationDetails.getServiceWithEmployees.serviceDetails),
      serviceDetails: consultationDetails.getServiceWithEmployees.serviceDetails,
      tags: this.tagList,
      isOwnerEmployee: consultationDetails.getServiceWithEmployees.employeesDetails.some(
        employeesDetail =>
          employeesDetail.employeeProfile.accountId ===
          consultationDetails.getServiceWithEmployees.serviceDetails.ownerProfile.accountId,
      ),
    };
  }

  private buildFooterData(
    userId: string,
    getServiceDetails: IConsultationDetails,
    expertIsAvailable: boolean,
    selectedExpertId: string,
  ): IConsultationFooterData {
    return {
      userId,
      ownerAccountId: getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.accountId,
      expertsIdList: getServiceDetails.expertIds,
      isExpertAvailable: expertIsAvailable,
      isFreelance: getServiceDetails.getServiceWithEmployees.serviceDetails.isFreelance,
      defaultPaymentMethod: getServiceDetails.defaultPaymentMethod,
      creditCards: getServiceDetails.creditCards,
      price: getServiceDetails.getServiceWithEmployees.serviceDetails.price,
      vatRateType: this.selectVatRateType(getServiceDetails),
      getCommissions: getServiceDetails.getCommissions,
      selectedExpertId,
    };
  }

  private selectVatRateType(getServiceDetails: IConsultationDetails): EmploymentWithExpertProfile.VatRateTypeEnum {
    return getServiceDetails.getServiceWithEmployees.serviceDetails.isFreelance
      ? getServiceDetails.getServiceWithEmployees.serviceDetails.vatRateType
      : this.getEmployeeVatRateType(getServiceDetails);
  }

  private isExpertConsultation(serviceDetails: ServiceWithOwnerProfile): boolean {
    return serviceDetails.ownerProfile.profileType !== GetProfile.ProfileTypeEnum.ORG;
  }

  private getEmployeeVatRateType(getServiceDetails: IConsultationDetails): EmploymentWithExpertProfile.VatRateTypeEnum {
    try {
      return getServiceDetails.getServiceWithEmployees.employeesDetails.filter(
        employment => getServiceDetails.employmentId === employment.id,
      )[0].vatRateType;
    } catch (error) {
      this.loggerService.error('Can not find employment', error);

      return EmploymentWithExpertProfile.VatRateTypeEnum.NATURALPERSON;
    }
  }
}
