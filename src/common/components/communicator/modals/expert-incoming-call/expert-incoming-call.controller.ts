import {GetService} from 'profitelo-api-ng/model/models'

export interface IExpertIncomingCallParentControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  service: GetService
}

export interface IExpertIncomingCallControllerScope extends ng.IScope {
  rejectCall: () => void
  answerCall: () => void
  $parent: IExpertIncomingCallParentControllerScope
}

export class ExpertIncomingCallController implements ng.IController {

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor($scope: IExpertIncomingCallControllerScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    $scope.rejectCall = (): void => {
      $uibModalInstance.dismiss('reject')
      $scope.$parent.rejectCall()
    }

    $scope.answerCall = (): void => {
      $uibModalInstance.close('answer')
      $scope.$parent.answerCall()
    }
  }
}