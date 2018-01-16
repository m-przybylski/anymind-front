import {IGroupedMessagesComponentBindings} from './grouped-messages';
import {Message} from 'ratel-sdk-js'
import {CommunicatorService} from '../../../../../../../angular/shared/services/communicator/communicator.service';

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {

  public messages: Message[] = []
  public participantAvatar: string = ''
  public isMine: boolean = false

  static $inject = ['communicatorService'];

    constructor(private communicatorService: CommunicatorService) {
  }

  $onChanges = (): void => {
    if (this.messages) {
      const message = this.messages[0]
      const clientSession = this.communicatorService.getClientSession()
      this.isMine = typeof clientSession !== 'undefined' && clientSession.id === message.userId
    }
  }

}
