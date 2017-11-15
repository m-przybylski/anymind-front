import * as RatelSdk from 'ratel-sdk-js';
import {GetIncomingCallDetails} from 'profitelo-api-ng/model/models';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import {CallState, CurrentCall} from './current-call';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {CommunicatorService} from '../communicator.service'

export class CurrentExpertCall extends CurrentCall {

  constructor(timerFactory: TimerFactory,
              callbacksFactory: CallbacksFactory,
              callInvitation: RatelSdk.events.CallInvitation,
              incomingCallDetails: GetIncomingCallDetails,
              soundsService: SoundsService,
              communicatorService: CommunicatorService,
              RatelApi: RatelApi) {

    super(callbacksFactory, soundsService, callInvitation.call as RatelSdk.BusinessCall, timerFactory,
      incomingCallDetails.service, incomingCallDetails.sue, communicatorService, RatelApi);
    this.setState(CallState.INCOMING)
  }

  public answer = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream);
    return this.ratelCall.answer(localStream).then(this.onAnswer);
  }

  public pull = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream)
    return this.pullCall(localStream).then(() => {
      this.setState(CallState.PENDING);
      this.startTimer()
    })
  }

  public reject = (): Promise<void> => this.ratelCall.reject('rejected').then(this.onReject);

  private onAnswer = (): void => {
    this.callbacks.notify(CurrentCall.events.onAnswered)
    this.setState(CallState.PENDING);
    this.startTimer();
  }

  private onReject = (): void => {
    this.setState(CallState.REJECTED);
  }
}
