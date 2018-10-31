import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { EmploymentWithService, ExpertProfileView, ProfileDocument } from '@anymind-ng/api';
import { CreateProfileModalComponent } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { takeUntil, pluck } from 'rxjs/operators';
import { ProfileBaseComponent } from '../../common/profile-base.component';
import { IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import {
  CreateEditConsultationModalComponent,
  ICreateEditConsultationPayload,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { CONSULTATIONDETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

@Component({
  selector: 'plat-expert-dashboard',
  templateUrl: './expert-dashboard.view.component.html',
  styleUrls: ['./expert-dashboard.view.component.sass'],
})
export class ExpertDashboardComponent extends ProfileBaseComponent {
  public avatarToken: string;
  public name: string;
  public links: ReadonlyArray<string>;
  public description: string;
  public isOwnProfile: boolean;
  public consultations: ReadonlyArray<EmploymentWithService> = [];
  public expertId: string;
  public isLogged: boolean;
  public isCompany: boolean;
  public expertDocuments: ReadonlyArray<ProfileDocument> = [];
  public readonly avatarSize = AvatarSizeEnum.X_156;
  constructor(protected route: ActivatedRoute, protected injector: Injector) {
    super(injector);
    this.route.data
      .pipe(
        takeUntil(this.destroyed$),
        pluck('expert'),
      )
      .subscribe((data: IExpertCompanyDashboardResolverData<ExpertProfileView>) => {
        this.avatarToken = data.profile.expertProfile.avatar;
        this.name = data.profile.expertProfile.name;
        this.description = data.profile.expertProfile.description;
        this.links = this.getFlattenLinks(data.profile.employments);
        this.isOwnProfile = data.isOwnProfile;
        this.consultations = data.profile.employments;
        this.expertDocuments = data.profile.expertProfile.documents;
        this.expertId = data.profile.expertProfile.id;
        this.isLogged = data.isLogged;
        this.isCompany = data.isCompany;
      });
  }
  /**
   * callback when edit profile is triggered.
   * Modal resolves to true if user changes something.
   */
  public editProfile = async (): Promise<void> => {
    try {
      const changed: boolean | undefined = await this.openModalResult(CreateProfileModalComponent);
      this.reloadIfNeeded(changed);
    } catch (result) {
      return;
    }
  };
  /**
   * callback when add consultation is triggered
   * this opens modal
   */
  public addConsultation = async (): Promise<void> => {
    const payload: ICreateEditConsultationPayload = {
      isExpertConsultation: true,
      isOwnerEmployee: true,
    };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(payload),
    };
    try {
      const changed: boolean | undefined = await this.openModalResult(
        CreateEditConsultationModalComponent,
        modalOptions,
      );
      this.reloadIfNeeded(changed);
    } catch (result) {
      return;
    }
  };

  /**
   * callback to open consultation detail modal
   */
  public openConsultationDetail = async (serviceId: string, expertId: string): Promise<void> => {
    const modalRef = this.openModal(ConsultationDetailsViewComponent);
    modalRef.componentInstance.expertId = expertId;
    modalRef.componentInstance.serviceId = serviceId;
    modalRef.componentInstance.userType = UserTypeEnum.EXPERT;
    try {
      const closedServiceId: string | undefined = await modalRef.result;
      if (closedServiceId === serviceId) {
        this.reload();
      }
    } catch (result) {
      return;
    }
  };

  private setupInjector = (payload: ICreateEditConsultationPayload): Injector =>
    Injector.create({ providers: [{ provide: CONSULTATIONDETAILS, useValue: payload }], parent: this.injector });
}
