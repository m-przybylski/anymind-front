import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {UserService} from '../user/user.service'
import {EventsService} from '../events/events.service'
import {CallSummaryWebsocketObject} from '../../models/CallSummary'
import {Subject} from 'rxjs/Subject'

export class ProfiteloWebsocketService {
  private websocket: WebSocket
  private wsEndpoint: string

  private static reconnectTimeout = 1000
  private readonly events = {
    onInit: new Subject<void>(),
    onCallSummary: new Subject<CallSummaryWebsocketObject>(),
    onOneMinuteLeftWarning: new Subject<void>(),
    onNewFinancialOperation: new Subject<any>(),
    onClientCallCost: new Subject<any>(),
    onProfileCallProfit: new Subject<any>()
  }

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private userService: UserService,
              private eventsService: EventsService,
              private $timeout: ng.ITimeoutService,
              CommonConfig: CommonConfig) {
    this.wsEndpoint = CommonConfig.getAllData().urls.ws + '/ws/register'
    this.eventsService.on('login', this.connectWebsocket)
    this.eventsService.on('logout', this.disconnectWebsocket)
  }

  public initializeWebsocket = (): void => {
    this.userService.getUser().then(this.connectWebsocket)
  }

  public sendMessage = (msg: string, type: string): boolean => {
    if (this.websocket.readyState === WebSocket.OPEN) {
      const serialized = {
        messageType: type,
        value: msg
      }
      this.websocket.send(JSON.stringify(serialized))
      return true
    } else {
      this.$log.error('Can not send message, websocket is closed. State: ' + this.websocket.readyState)
      return false
    }
  }

  public onInit = (callback: () => void): void => {
    this.events.onInit.subscribe(callback)
  }

  public onCallSummary = (callback: (data: CallSummaryWebsocketObject) => void): void => {
    this.events.onCallSummary.subscribe(callback)
  }

  public onOneMinuteLeftWarning = (callback: () => void): void => {
    this.events.onOneMinuteLeftWarning.subscribe(callback)
  }

  public onNewFinancialOperation = (callback: (data: any) => void): void => {
    this.events.onNewFinancialOperation.subscribe(callback)
  }

  public onClientCallCost = (callback: (data: any) => void): void => {
    this.events.onClientCallCost.subscribe(callback)
  }

  public onProfileCallProfit = (callback: (data: any) => void): void => {
    this.events.onProfileCallProfit.subscribe(callback)
  }

  private onSocketOpen = (): void => {
    this.events.onInit.next()
  }

  private handleMessageType = (data: any): void => {
    const type = data.messageType
    const value = data.value

    switch (type) {
      case 'CALL_SUMMARY':
        this.events.onCallSummary.next(value)
        break
      case 'ONE_MINUTE_LEFT_WARNING':
        this.events.onOneMinuteLeftWarning.next(value)
        break
      case 'NEW_FINANCIAL_OPERATION':
        this.events.onNewFinancialOperation.next(value)
        break
      case 'CLIENT_CALL_COST':
        this.events.onClientCallCost.next(value)
        break
      case 'PROFILE_CALL_PROFIT':
        this.events.onProfileCallProfit.next(value)
        break
      default:
        this.$log.info('Unknown messageType ' + type)
        break
    }
  }

  private onSocketMessage = (event: any): void => {
    try {
      const data = JSON.parse(event.data)
      this.handleMessageType(data)
    } catch (err) {
      this.$log.error(err)
    }
    this.$log.debug(event)
  }

  private onSocketError = (err: any): void =>
    this.$log.error(err)

  private onSocketClose = (event: any): void => {
    this.$log.info('Profitelo websocket closed', event)
    this.userService.getUser().then(() => {
      this.$timeout(this.connectWebsocket, ProfiteloWebsocketService.reconnectTimeout)
    })
  }

  public disconnectWebsocket = (): void => {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  private connectWebsocket = (): void => {
    this.websocket = new WebSocket(this.wsEndpoint)
    this.websocket.onopen = this.onSocketOpen
    this.websocket.onmessage = this.onSocketMessage
    this.websocket.onerror = this.onSocketError
    this.websocket.onclose = this.onSocketClose
  }
}
