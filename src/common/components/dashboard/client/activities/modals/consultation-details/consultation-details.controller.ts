import {UrlService} from '../../../../../../services/url/url.service'
import {ViewsApi, ServiceApi} from 'profitelo-api-ng/api/api'
import {MoneyDto, Tag, GetCallDetails} from 'profitelo-api-ng/model/models'

export interface IClientConsultationDetailsScope extends ng.IScope {
}

export class ClientConsultationDetailsController implements ng.IController {
  public isLoading: boolean = true
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public recommendedTags: any[] = []
  public serviceTags: any[] = []
  public expertAvatar?: string
  public expertName?: string
  public serviceName: string
  public serviceId: string
  public callCost: MoneyDto
  public startedAt: Date
  public callDuration: number
  public callCostPerMinute?: MoneyDto
  public isRecommended: boolean
  public isRecommendable: boolean
  private callDetails: GetCallDetails
  public sueId: string

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $log: ng.ILogService, $scope: IClientConsultationDetailsScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private ServiceApi: ServiceApi,
              private urlService: UrlService, ViewsApi: ViewsApi) {

    this.sueId = $scope.$parent.sueId

    ViewsApi.getClientDashboardCallDetailsRoute($scope.$parent.sueId)
    .then((res) => this.onGetCallDetails(res), this.onGetCallDetailsError)
  }

  private onGetCallDetailsError = (err: any): void => {
    this.isLoading = false
    this.$log.error(err)
  }

  private onGetCallDetails = (response: GetCallDetails): void => {
    this.callDetails = response
    if (response.isRecommendable) {
      this.ServiceApi.postServicesTagsRoute({
        serviceIds: [response.service.id]
      }).then(this.onServiceTags, this.onServiceTagsError)
    } else {
      this.openClientActivityModal()
    }
  }

  private onServiceTagsError = (err: any): void => {
    this.$log.error(err)
  }

  private onServiceTags = (res: any): void => {
    this.openClientActivityModal(res[0]!.tags)
  }

  private openClientActivityModal = (serviceTags: Array<Tag> = []): void => {
    const expertAvatarFileId = this.callDetails.expertProfile.expertDetails!.avatar
    this.expertAvatar = expertAvatarFileId ? this.urlService.resolveFileUrl(expertAvatarFileId) : undefined
    this.expertName = this.callDetails.expertProfile.expertDetails!.name
    this.recommendedTags = this.callDetails.recommendedTags
    this.serviceName = this.callDetails.service.name
    this.serviceId = this.callDetails.service.id
    this.callCost = this.callDetails.serviceUsageDetails.callCost
    this.startedAt = this.callDetails.serviceUsageDetails.startedAt
    this.callDuration = this.callDetails.serviceUsageDetails.callDuration
    this.callCostPerMinute = this.callDetails.service.price
    this.isRecommended = this.callDetails.isRecommended
    this.isRecommendable = this.callDetails.isRecommendable
    this.serviceTags = serviceTags
    this.isLoading = false
  }

}
