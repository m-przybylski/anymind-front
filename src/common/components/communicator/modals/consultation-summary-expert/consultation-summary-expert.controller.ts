import {CallSummary} from '../../../../models/CallSummary'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {ExpertCallSummary} from '../../../../models/ExpertCallSummary'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {ServiceApi} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {TranslatorService} from '../../../../services/translator/translator.service';
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {IAngularEvent} from 'angular'

export interface IConsultationSummaryExpertControllerScope extends ng.IScope {
  callSummary?: CallSummary
  onModalClose: () => void
  isFullscreen: boolean
  isNavbar: boolean
  serviceId: string
}

interface IComplaintReason {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryExpertController implements ng.IController {
  public complaintReasons: IComplaintReason[]
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public callSummary?: ExpertCallSummary
  public isLoading: boolean

  public clientName: string
  public serviceName: string
  public callDuration: number
  public profit: MoneyDto
  public clientAvatar: string
  public clientReportMessage: string = ''
  public isSendingClientReport: boolean = false
  public isClientReportSent: boolean = false
  public isSubmitted: boolean = false

  private static readonly minValidClientReportMessageLength: number = 3
  private sueId: string

  /* @ngInject */
  constructor(private $scope: IConsultationSummaryExpertControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private ServiceApi: ServiceApi,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private errorHandler: ErrorHandlerService) {

    this.isLoading = true

    this.complaintReasons = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_INCOPENTENT_CLIENT',
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_RUDE_CLIENT',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.' +
        'REASON_TECHNICAL_PROBLEMS',
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'DASHBOARD.EXPERT.ACTIVITIES.MODALS.CONSULTATION_DETAILS.COMPLAINS.REPORT_COMPLAINS.REASON_OTHER',
      }
    ]

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()

    this.addCloseModalListener()
  }

  public onSendClientReportClick = (): void => {
    this.isSubmitted = true
    if (this.isClientReportValid())
      this.sendClientReport(this.sueId, this.clientReportMessage)
  }

  public sendClientReport = (sueId: string, message: string): void => {
    this.isSendingClientReport = true
    this.ServiceApi.postExpertComplaintRoute(sueId, {message}).then(() => {
      this.topAlertService.success({
        message:
          this.translatorService.translate(
            'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.REPORT_CLIENT.CONFIRM_MESSAGE'),
        timeout: 2
      })
      this.isClientReportSent = true
    }).catch((error) => {
      this.errorHandler.handleServerError(error, 'Can not send report client')
    }).finally(() => {
      this.isSendingClientReport = false
    })
  }

  public isClientReportValid = (): boolean => this.clientReportMessage.length >=
    ConsultationSummaryExpertController.minValidClientReportMessageLength

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel')

  private onCallSummary = (callSummary: ExpertCallSummary): void => {
    if (callSummary.service.id === this.$scope.serviceId) {
      this.callSummary = callSummary
      this.isLoading = false
      if (this.callSummary.clientAccountSettings) {
        this.clientName = this.callSummary.clientAccountSettings.nickname
        this.clientAvatar = this.callSummary.clientAccountSettings.avatar
      }
      this.serviceName = this.callSummary.service.name
      this.profit = this.callSummary.profit
      this.callDuration = this.callSummary.callDuration
      this.sueId = this.callSummary.serviceUsageEventId
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const callSummary = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
    callSummary && this.callSummaryService.isExpertCallSummary(callSummary)
      ? this.onCallSummary(callSummary) : undefined
  }

  private addCloseModalListener = (): void => {
    this.$scope.$on('modal.closing', (event: IAngularEvent) => {
      const confirmWindowMessage: string =
        this.translatorService
          .translate('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.REPORT_CLIENT.CONFIRM_MESSAGE')
      if (!confirm(confirmWindowMessage)) {
        event.preventDefault()
      }
    })
  }
}
