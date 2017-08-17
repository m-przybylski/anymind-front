import {Tag} from 'profitelo-api-ng/model/models'
import {CallSummaryService} from '../../../../services/call-summary/call-summary.service'
import {IAngularEvent} from 'angular'
import {ClientCallSummary} from '../../../../models/ClientCallSummary'
import {IFilterService} from '../../../../services/filter/filter.service'

export interface IConsultationSummaryClientControllerScope extends ng.IScope {
  expertAvatar: string
  rating: number
  callSummary?: ClientCallSummary
  isRecommended: boolean
  recommendServiceTags: () => void
  closeModal: () => void
  onModalClose: () => void
  onTagsSelectChange: (tags: Tag[]) => void
  recommendService: () => void
  isFullscreen: boolean
  isNavbar: boolean
  chooseExpertsTag: boolean
  serviceId: string
}

interface ItechnicalProblems {
  id: string,
  isDescriptive: boolean,
  name: string
}

export class ConsultationSummaryClientController implements ng.IController {

  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public isRecommended: boolean = false
  public tags: Tag[]
  public technicalProblems: ItechnicalProblems[]
  public currentSize: number
  public tabsContainerStyles = {
    height: this.currentSize
  }
  public clientReportModel: string = ''
  public currentTab: string = ConsultationSummaryClientController.tabId.askTab
  private static readonly tabId = {
    askTab: 'ask',
    tagsTab: 'tag',
    commentTab: 'comment'
  }
  private isSendButtonClicked: boolean = false
  private isTechnicalProblemsTab: boolean = true

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $scope: IConsultationSummaryClientControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private callSummaryService: CallSummaryService,
              private $filter: IFilterService) {

    this.callSummaryService.onCallSummary(this.onCallSummary)
    this.loadFromExistingCallSummaries()

    this.technicalProblems = [
      {
        id: 'id2value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.I_DIDNT_HEAR'
      },
      {
        id: 'id3value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.EXPERT_DOESNT_HEAR',
      },
      {
        id: 'id4value',
        isDescriptive: false,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.NOISES'
      },
      {
        id: 'id5value',
        isDescriptive: true,
        name: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.TECHNICAL_PROBLEMS_TAB.OTHER',
      }
    ]

  }

  public showTagsTab = (): void => {
    this.currentTab = ConsultationSummaryClientController.tabId.tagsTab
    this.isTechnicalProblemsTab = false
  }

  public showCommentTab = (): void => {
    this.currentTab = ConsultationSummaryClientController.tabId.commentTab
    this.isTechnicalProblemsTab = false
    this.addCloseModalListener()
  }

  public setTabsContainerSize = (currentSize: number): void => {
    this.tabsContainerStyles.height = currentSize
  }

  public sendComment = (): void => {
    this.isSendButtonClicked = true
    this.closeModal()
  }

  public onTagsSelectChange = (tags: Tag[]): void => {
    this.tags = tags
  }

  private addCloseModalListener = (): void => {
    this.$scope.$on('modal.closing', (event: IAngularEvent) => {
      if (this.isCommentExist() && !this.isSendButtonClicked) {
       const confirmWindowMessage: string =
         this.$filter('translate')('COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_CLIENT.CONFIRM_WINDOW_MESSAGE')
        if (!confirm(confirmWindowMessage)) {
          event.preventDefault()
        }
      }
    })
  }

  private closeModal = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  private setCallSummary = (callSummary: ClientCallSummary): void => {
    this.$scope.callSummary = callSummary
    if (callSummary.companyExpertProfile.expertDetails) {
      this.$scope.expertAvatar = callSummary.companyExpertProfile.expertDetails.avatar
      this.$scope.rating = callSummary.service.rating
    }
  }

  private onCallSummary = (data: any): void => {
    this.$log.debug(data)
    const callSummary = data.callSummary
    if (callSummary.service.id === this.$scope.serviceId) {
      this.setCallSummary(callSummary)
    }
  }

  private loadFromExistingCallSummaries = (): void => {
    const callSummary = this.callSummaryService.takeCallSummary(this.$scope.serviceId)
    if (callSummary) {
      this.onCallSummary(callSummary)
    }
  }

  private isCommentExist = (): boolean => this.clientReportModel.length > 0

}
