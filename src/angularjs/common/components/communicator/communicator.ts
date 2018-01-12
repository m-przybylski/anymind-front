import * as angular from 'angular'
import 'angular-translate'
import 'angular-sanitize'
import {CommunicatorComponent} from './communicator.component'
import {CommunicatorService} from './communicator.service'
import apiModule from 'profitelo-api-ng/api.module'
import userModule from '../../services/user/user'
import urlModule from '../../services/url/url'
import soundsModule from '../../services/sounds/sounds'
import modalsModule from '../../services/modals/modals'
import timerModule from '../../services/timer/timer'
import filtersModule from '../../filters/filters'
import './navigation/navigation'
import './messenger/messenger'
import ratelSdkModule from '../ratel-sdk/ratel-sdk'
import eventsModule from '../../services/events/events'
import {ClientCallService} from './call-services/client-call.service'
import {ExpertCallService} from './call-services/expert-call.service'
import userAvatarModule from '../interface/user-avatar/user-avatar'
import navigationModule from './navigation/navigation'
import RtcDetectorModule from '../../services/rtc-detector/rtc-detector'
import {PrecallService} from './precall-service/precall.service'
import translatorModule from '../../services/translator/translator'
import {MicrophoneService} from './microphone-service/microphone.service'

const communicatorModule = angular.module('profitelo.components.communicator', [
  'pascalprecht.translate',
  urlModule,
  userModule,
  apiModule,
  apiModule,
  timerModule,
  userModule,
  modalsModule,
  eventsModule,
  soundsModule,
  userAvatarModule,
  navigationModule,
  'ngSanitize',
  'commonConfig',
  filtersModule,
  ratelSdkModule,
  translatorModule,
  RtcDetectorModule,
  'profitelo.components.communicator.navigation',
  'profitelo.components.communicator.messenger'
])
  .config(['$qProvider', ($qProvider: ng.IQProvider): any => {
    $qProvider.errorOnUnhandledRejections(false)
  }])
  .component('communicator', new CommunicatorComponent)
  .service('communicatorService', CommunicatorService)
  .service('precallService', PrecallService)
  .service('clientCallService', ClientCallService)
  .service('expertCallService', ExpertCallService)
  .service('microphoneService', MicrophoneService)
  .name

export default communicatorModule;