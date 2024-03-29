// tslint:disable:strict-boolean-expressions
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnimationComponentService } from './animation/modal-animation.animation.service';
import { ModalAnimationComponentDirective } from './animation/modal-animation.component.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Config } from '../../../../../config';
import { ContentHeightAnimationService } from '../../../services/animation/content-height/content-height.animation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export enum ModalContainerTypeEnum {
  SMALL_WIDTH = 'SMALL_WIDTH',
  MEDIUM_WIDTH = 'MEDIUM_WIDTH',
  BIG_WIDTH = 'BIG_WIDTH',
  CROP_WIDTH = 'CROP_WIDTH',
  NO_PADDING = 'NO_PADDING',
  SMALL_NO_PADDING = 'SMALL_NO_PADDING',
  FILE_PREVIEW = 'FILE_PREVIEW',
}

@Component({
  selector: 'plat-modal-component',
  styleUrls: ['./modal.component.sass'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public modalTrTitleHeader?: string;

  @Input()
  public isHeaderVisible = true;

  @Input()
  public isBackwardVisible?: boolean;

  @Input()
  public modalContainerClass?: ModalContainerTypeEnum = ModalContainerTypeEnum.BIG_WIDTH;

  @Input()
  public isCloseButtonVisible = true;

  @Output()
  public backwardClick = new EventEmitter<void>();

  @ViewChild(ModalAnimationComponentDirective)
  public onPendingRequest: ModalAnimationComponentDirective;

  @ViewChild(ModalAnimationComponentDirective)
  public onChangeModalContent: ModalAnimationComponentDirective;

  public isLoading = true;
  public isPending = true;
  private logger: LoggerService;
  private ngUnsubscribe = new Subject<string>();

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private contentHeightAnimationService: ContentHeightAnimationService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ModalComponent');

    this.modalAnimationComponentService
      .onModalContentChange()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        onChange => this.callAnimationOnChangeModalContent(onChange),
        err => this.handleModalAnimationServiceError(err, 'Can not get on change value'),
      );
  }

  public ngOnDestroy(): void {
    this.contentHeightAnimationService.getPreviousHeight$().next('auto');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public ngOnInit(): void {
    this.setModalContainerWidth();
    if (this.modalContainerClass === ModalContainerTypeEnum.CROP_WIDTH) {
      this.isLoading = false;
    }
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService
      .isPendingRequest()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        isPending => this.callAnimationOnRequest(isPending),
        err => this.handleModalAnimationServiceError(err, 'Can not get pending value'),
      );
  }

  public onBackClick = (): void => {
    this.backwardClick.next();
  };

  public onModalClose = (): void => {
    this.activeModal.close();
  };

  // tslint:disable-next-line:cyclomatic-complexity
  public setModalContainerWidth = (): string => {
    switch (this.modalContainerClass) {
      case ModalContainerTypeEnum.SMALL_WIDTH:
        return 'modal-component__container--small';

      case ModalContainerTypeEnum.MEDIUM_WIDTH:
        return 'modal-component__container--medium';

      case ModalContainerTypeEnum.BIG_WIDTH:
        return 'modal-component__container--big';

      case ModalContainerTypeEnum.CROP_WIDTH:
        return 'modal-component__container--crop';

      case ModalContainerTypeEnum.NO_PADDING:
        return 'modal-component__container--no-padding';

      case ModalContainerTypeEnum.SMALL_NO_PADDING:
        return 'modal-component__container--no-padding-small';

      default:
        return 'modal-component__container--medium';
    }
  };

  private createPreloader = (): void => {
    const loadingDelay = Config.modalPreloaderDelay.delayAfterRequest;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, loadingDelay);
  };

  private callAnimationOnRequest = (isPending: boolean): void => {
    this.onPendingRequest.onResponse();
    this.isLoading = isPending;
  };

  private callAnimationOnChangeModalContent = (isPending: boolean): void => {
    this.createPreloader();
    this.onChangeModalContent.onChangeModalContent();
    this.isPending = isPending;
  };

  private handleModalAnimationServiceError = (error: HttpErrorResponse, errorMsg: string): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn(errorMsg, error);
    this.isPending = false;
  };
}
