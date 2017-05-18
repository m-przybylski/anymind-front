import { Tag } from 'profitelo-api-ng/model/models'
import {MoneyDto} from 'profitelo-api-ng/model/models'

export interface IInvitationsModalScope extends ng.IScope {}

export class InvitationsModalController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  public onModalClose = () => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public tags: Array<Tag> = [
    {
      id: 'mockId',
      name: 'tag-1',
      status: Tag.StatusEnum.NEW,
      persisted: false
    },
    {
      id: 'mockId2',
      name: 'tag-2',
      status: Tag.StatusEnum.NEW,
      persisted: false
    }
  ]

  public cosultationPrice: MoneyDto = {
    amount: 705,
    currency: 'PLN'
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {}

}