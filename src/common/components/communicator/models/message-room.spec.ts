import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {MessageRoom} from './message-room'
import {roomType} from 'ratel-sdk-js'
import * as RatelSdk from 'ratel-sdk-js';

describe('Unit tests: MessageRoom', () => {

  let messageRoom: MessageRoom
  let q: ng.IQService

  const businessRoom: RatelSdk.BusinessRoom = <any>{
    roomType: roomType.RoomType.BUSINESS,
    onTyping: () => {},
    onMark: () => {},
    onCustom: () => {},
    onInvited: () => {},
    join: () => {},
    setMark: () => {},
    sendCustom: () => {},
    getMessages: () => {}
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('soundsService', SoundsService)
  }))

  beforeEach((inject((soundsService: SoundsService,
                      $q: ng.IQService) => {
    q = $q
    messageRoom = new MessageRoom(soundsService)
    messageRoom.setRoom(businessRoom)
  })))

  it('should currentClientCall exist', () => {
    expect(MessageRoom).toBeTruthy()
  })

  it('should call setMark from room', () => {
    spyOn(businessRoom, 'setMark')
    messageRoom.mark(123)
    expect(businessRoom.setMark).toHaveBeenCalled()
  })

  it('should call send message ', () => {
    spyOn(businessRoom, 'sendCustom')
    messageRoom.sendMessage('msg', {})
    expect(businessRoom.sendCustom).toHaveBeenCalled()
  })

  it('should get chat history', () => {
    spyOn(businessRoom, 'getMessages')
    messageRoom.getHistory()
    expect(businessRoom.getMessages).toHaveBeenCalled()
  })

})
