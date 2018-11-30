// tslint:disable:no-object-literal-type-assertion
// tslint:disable:max-file-line-count
import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { CreateProfileModalComponentService } from './create-profile.component.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { HttpErrorResponse } from '@angular/common/http';
import { PutGeneralSettings } from '@anymind-ng/api/model/putGeneralSettings';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';
import { FileCategoryEnum } from '../../../../../../angularjs/common/classes/file-type-checker/file-type-checker';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { Config } from '../../../../../../config';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import { takeUntil, take, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions, SessionActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';
import { Store, select } from '@ngrx/store';
import { VisibilityInitActions } from '@platform/features/dashboard/actions';

@Component({
  selector: 'plat-create-profile',
  styleUrls: ['./create-profile.component.sass'],
  templateUrl: './create-profile.component.html',
})
export class CreateProfileModalComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly profileDescriptionMinLength = Config.inputsLengthNumbers.profileDescriptionMinLength;
  public readonly profileDescriptionMaxLength = Config.inputsLengthNumbers.profileDescriptionMaxLength;
  public readonly expertFormControlName = 'expertNameProfileControl';
  public readonly expertFormControlAvatar = 'expertAvatarProfileControl';
  public readonly expertFormControlDescription = 'expertDescriptionControl';
  public readonly expertFormControlLink = 'expertLinkControl';
  public readonly clientFormControlName = 'clientNameProfileControl';
  public readonly clientFormControlAvatar = 'clientAvatarProfileControl';
  public clientNameForm = new FormGroup({});
  public expertNameForm = new FormGroup({});
  public isFileUploading: boolean;
  public maxValidFileSize = 30000000;
  public maxValidFilesCount = 20;
  public profileDetails: GetProfileWithDocuments;
  public fileUploadTokensList: ReadonlyArray<string>;
  public linksList: ReadonlyArray<string> = [];
  public profileLinksList: ReadonlyArray<string> = [];
  public profileDocumentsList: ReadonlyArray<ProfileDocument> = [];
  /**
   * start modal with pending set to false
   * initial information are from store.
   * This is potential candidate to be removed.
   */
  public isPending = false;
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;
  public isInputDisabled = false;
  public isOpenAsExpert: boolean;
  public isExpert: boolean;
  public isCompany: boolean;
  public modalHeaderTr: string;

  @Input()
  public isExpertForm = true;

  private readonly modalHeaderTrKeys = {
    createProfile: 'EDIT_PROFILE.CREATE_TITLE',
    editProfile: 'EDIT_PROFILE.EDIT_TITLE',
  };
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private createProfileModalComponentService: CreateProfileModalComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private router: Router,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateProfileModalComponent');
  }

  public ngOnInit(): void {
    this.isOpenAsExpert = this.isExpertForm;
    this.store
      .pipe(
        select(fromCore.getSession),
        map(getSessionWithAccount => {
          if (getSessionWithAccount === undefined) {
            throw new Error('no session');
          }

          return getSessionWithAccount;
        }),
        take(1),
      )
      .subscribe(
        session => {
          /**
           * this code determines if user is expert or organization
           * and assign corresponding parameters to class properties
           */
          this.branchProfileType(session);
        },
        err => {
          /**
           * No session. Log show error message to the user
           */
          this.handleResponseError(err, 'Can not get session');
        },
      );
  }

  public ngAfterViewInit(): void {
    /**
     * need to turn off modal animation;
     */
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public ngOnDestroy(): void {
    this.modalAnimationComponentService.getPreviousHeight$().next('inherit');
    this.createProfileModalComponentService.setAvatarToken('');
    this.createProfileModalComponentService.setUserName('');
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onCreateExpertFormSubmit = (expertFormGroup: FormGroup): void => {
    if (expertFormGroup.valid && !this.isPending) {
      this.isInputDisabled = true;
      this.sendExpertProfile();
    } else {
      this.formUtils.validateAllFormFields(expertFormGroup);
    }
  };

  public onClientFormSubmit = (clientNameForm: FormGroup): void => {
    if (clientNameForm.valid && !this.isPending) {
      const clientAvatar = clientNameForm.controls[this.clientFormControlAvatar].value;

      this.isInputDisabled = true;
      this.sendClientProfile({
        nickname: clientNameForm.controls[this.clientFormControlName].value,
        avatar: clientAvatar.length > 0 ? clientAvatar : undefined,
      });
    } else {
      this.formUtils.validateAllFormFields(clientNameForm);
    }
  };

  public onBackToClientStep = (): void => {
    this.isExpertForm = false;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  };

  public onCreateExpertAccount = (): void => {
    this.isExpertForm = !this.isExpertForm;
    this.modalAnimationComponentService.onModalContentChange().next(true);
  };

  public onUploadingFile = (isUploading: boolean): void => {
    this.isFileUploading = isUploading;
    this.isInputDisabled = isUploading;
    this.isPending = isUploading;
  };

  public onAddProfileLink = (links: ReadonlyArray<string>): void => {
    this.linksList = links;
  };

  public onUploadFile = (tokenList: ReadonlyArray<string>): void => {
    this.fileUploadTokensList = tokenList;
  };

  private branchProfileType = (session: GetSessionWithAccount): void => {
    this.isExpert = session.isExpert;
    this.isCompany = session.isCompany;
    if (this.isExpert) {
      this.assignExpertProfileDetails();
      this.modalHeaderTr = this.modalHeaderTrKeys.editProfile;

      return;
    }
    this.assignClientProfileDetails(session);
    this.modalHeaderTr = this.modalHeaderTrKeys.createProfile;
  };

  private sendClientProfile = (data: PutGeneralSettings): void => {
    this.createProfileModalComponentService.createClientProfile(data).subscribe(
      () => {
        this.store.dispatch(new SessionActions.FetchSessionAction());
        this.onModalClose();
      },
      err => this.handleResponseError(err, 'Can not set client profile'),
    );
  };

  private assignClientProfileDetails = (session: GetSessionWithAccount): void => {
    this.isExpertForm ? this.setClientFormValuesAsExpert(session) : this.setClientFormValues(session);
  };

  private assignExpertProfileDetails = (): void => {
    this.modalAnimationComponentService.startLoadingAnimation();
    this.createProfileModalComponentService.getProfileDetails().subscribe(
      profileDetails => {
        this.setExpertFormValues(profileDetails);
        this.modalAnimationComponentService.stopLoadingAnimation();
      },
      err => this.handleResponseError(err, 'Can not get expert file profile'),
    );
  };

  private setClientFormValues = (accountDetails: GetSessionWithAccount): void => {
    if (
      typeof accountDetails.account.details.nickname !== 'undefined' ||
      typeof accountDetails.account.details.avatar !== 'undefined'
    ) {
      this.clientNameForm.controls[this.clientFormControlName].setValue(accountDetails.account.details.nickname);
      this.clientNameForm.controls[this.clientFormControlAvatar].setValue(accountDetails.account.details.avatar);
      this.createProfileModalComponentService.setAvatarToken(accountDetails.account.details.avatar);
    }
  };

  private setClientFormValuesAsExpert = (accountDetails: GetSessionWithAccount): void => {
    if (
      typeof accountDetails.account.details.nickname !== 'undefined' ||
      typeof accountDetails.account.details.avatar !== 'undefined'
    ) {
      this.expertNameForm.controls[this.expertFormControlName].setValue(accountDetails.account.details.nickname);
      this.expertNameForm.controls[this.expertFormControlAvatar].setValue(accountDetails.account.details.avatar);
      this.createProfileModalComponentService.setAvatarToken(accountDetails.account.details.avatar);
    }
  };

  private setExpertFormValues = (profileDetails: GetProfileWithDocuments): void => {
    if (profileDetails.profile.expertDetails !== undefined) {
      this.expertNameForm.controls[this.expertFormControlName].setValue(profileDetails.profile.expertDetails.name);
      this.expertNameForm.controls[this.expertFormControlAvatar].setValue(profileDetails.profile.expertDetails.avatar);
      this.expertNameForm.controls[this.expertFormControlDescription].setValue(
        profileDetails.profile.expertDetails.description,
      );
      this.profileLinksList = profileDetails.profile.expertDetails.links;
      this.profileDocumentsList = profileDetails.expertDocuments;
      this.fileUploadTokensList = profileDetails.expertDocuments.map(file => file.token);
      this.createProfileModalComponentService.setAvatarToken(profileDetails.profile.expertDetails.avatar);
    }
  };

  private getExpertDetails = (): PutExpertDetails =>
    ({
      name: this.expertNameForm.controls[this.expertFormControlName].value,
      avatar: this.expertNameForm.controls[this.expertFormControlAvatar].value,
      description: this.expertNameForm.controls[this.expertFormControlDescription].value.toString(),
      links: this.linksList,
      files: this.fileUploadTokensList,
    } as PutExpertDetails);

  private sendExpertProfile = (): void => {
    this.createProfileModalComponentService
      .createExpertProfile(this.getExpertDetails())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        val => {
          this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.EXPERT));
          this.store.dispatch(new VisibilityInitActions.FetchInitVisibilityAction());
          this.sendClientProfile({
            nickname: this.expertNameForm.controls[this.expertFormControlName].value,
            avatar: this.expertNameForm.controls[this.expertFormControlAvatar].value,
          });
          !this.isExpert && this.router.url !== '/dashboard/user/discover'
            ? this.redirectToExpertState(val.id)
            : this.onModalClose();
        },
        err => this.handleResponseError(err, 'Can not create expert profile'),
      );
  };

  private redirectToExpertState = (val: string): void => {
    this.router
      .navigate([`dashboard/user/profile/${val}`])
      .then(isRedirectSuccessful => {
        this.onModalClose();
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to dashboard/user/profile/');
        }
      })
      .catch(this.logger.error.bind(this));
  };

  private handleResponseError = (error: HttpErrorResponse, errorMsg: string): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn(errorMsg, error);
    this.isPending = false;
    this.isInputDisabled = false;
  };

  private onModalClose = (): void => this.activeModal.close(true);
}
