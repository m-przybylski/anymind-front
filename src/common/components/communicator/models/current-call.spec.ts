import {CurrentCall} from './current-call'
import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApiMock} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import callbacksModule from '../../../services/callbacks/callbacks'
import {roomType} from 'ratel-sdk-js'

describe('Unit tests: CurrentCall', () => {

  let currentCall: CurrentCall
  const callbacksFactory: CallbacksFactory = <CallbacksFactory>{
    getInstance:(_keys: string[]) => {
      return  <any>{
        methods: {
          onEnd: (cb: () => void) => {cb()},
          onRejected: (cb: () => void) => {cb()},
          onRemoteStream: (cb: () => void) => {cb()},
          onParticipantOnline: (cb: () => void) => {cb()},
          onParticipantOffline: (cb: () => void) => {cb()},
          onVideoStart: (cb: () => void) => {cb()},
          onVideoStop: (cb: () => void) => {cb()},
          onCallTaken: (cb: () => void) => {cb()}
        }
      }
    }
  }
  const ratelCall: RatelSdk.BusinessCall = <any>{
    onAnswered: () => {},
    onRejected: () => {},
    onEnd: () => {},
    onActiveDevice: () => {},
    onInvited: () => {},
    onJoined: () => {},
    onLeft: () => {},
    onRemoteStream: () => {},
    onOffline: () => {},
    onOnline: () => {}
  }
  const service = <any>{
    price: 23,

  }
  const businessRoom: RatelSdk.BusinessRoom = <any>{
    roomType: roomType.RoomType.BUSINESS,
    onTyping: () => {},
    onMark: () => {},
    onCustom: () => {},
    onInvited: () => {},
    join: () => {}
  }
  const timerFactory: TimerFactory = <any>{
    getInstance: () => {}
  }
  const sue: ServiceUsageEvent = <any>{
    id: '12'
  }

  beforeEach(() => {
    angular.mock.module(callbacksModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('soundsService', SoundsService)
    $provide.value('RatelApiMock', RatelApiMock)
  }))

  beforeEach((inject((soundsService: SoundsService,
                      RatelApiMock: RatelApiMock) => {
    currentCall = new CurrentCall(callbacksFactory, soundsService, ratelCall, timerFactory, service, sue, RatelApiMock)
  })))

  it('should currentCall exist', () => {
    expect(currentCall).toBeTruthy()
  })

  it('should return service', () => {
    expect(currentCall.getService()).toEqual(service)
  })

  it('should return sue id', () => {
    expect(currentCall.getSueId()).toEqual(sue.id)
  })

  it('should return existing message room', () => {
    expect(currentCall.getMessageRoom()).toBeTruthy()
  })

  it('should call join room method', () => {
    spyOn(businessRoom, 'join')
    currentCall.setBusinessRoom(businessRoom)
    expect(businessRoom.join).toHaveBeenCalled()
  })

  it('should call callback onEnd function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onEnd(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onRejected function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onRejected(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onRemoteStream function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onRemoteStream(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onParticipantOnline function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onParticipantOnline(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onParticipantOffline function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onParticipantOffline(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onVideoStop function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onVideoStop(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onVideoStart function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onVideoStart(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onVideoStart function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentCall.onCallTaken(callBack)
    expect(callBack).toHaveBeenCalled()
  })
})