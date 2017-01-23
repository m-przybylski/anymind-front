module profitelo.services.profiteloWebsocket {

  export interface IProfiteloWebsocketService {
    sendMessage(msg: string, type: string): boolean
    onInit(callback: () => void): void
    onCallSummary(callback: (data: any) => void): void
  }

  class ProfiteloWebsocketService implements IProfiteloWebsocketService {

    private callbacks: any
    private websocket: WebSocket
    private wsEndpoint: string

    private static reconnectTimeout = 1000
    private static events = {
      onCallSummary: 'onCallSummary',
      onInit: 'onInit'
    }

    constructor(private $log: ng.ILogService, private $rootScope: IProfiteloRootScope,
                private $timeout: ng.ITimeoutService, private utilsService, private CommonConfig: ICommonConfig) {

      this.callbacks = utilsService.callbacksFactory(Object.keys(ProfiteloWebsocketService.events))
      this.wsEndpoint = CommonConfig.getAllData().urls.ws + '/ws/register'
      this.connectWebsocket()
    }

    public sendMessage = (msg: string, type: string) => {
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

    public onInit = (callback) => {
      this.callbacks.methods.onInit(callback)
    }

    public onCallSummary = (callback: (data: any) => void) => {
      this.callbacks.methods.onCallSummary(callback)
    }

    private onSocketOpen = () => {
      this.callbacks.notify(ProfiteloWebsocketService.events.onInit, null)
    }

    private handleMessageType = (data) => {
      const type = data.messageType
      const value = data.value

      switch (type) {
        case 'CallSummaryEvent':
          this.callbacks.notify(ProfiteloWebsocketService.events.onCallSummary, value)
          break

        default:
          this.$log.info('Unknown messageType ' + type)
          break
      }
    }

    private onSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.handleMessageType(data)
      } catch (err) {
        this.$log.error(err)
      }
      this.$log.debug(event)
    }

    private onSocketError = (err) =>
      this.$log.error(err)

    private cleanEvents = () => {
      this.websocket.onopen = null
      this.websocket.onmessage = null
      this.websocket.onerror = null
      this.websocket.onclose = null
    }

    private onSocketClose = (event) => {
      this.$log.info('Profitelo websocket closed', event)
      this.cleanEvents()
      this.$timeout(this.connectWebsocket, ProfiteloWebsocketService.reconnectTimeout)
    }

    private connectWebsocket = () => {
      if (!this.$rootScope.loggedIn) {
        this.$timeout(this.connectWebsocket, ProfiteloWebsocketService.reconnectTimeout)
        return
      }

      this.websocket = new WebSocket(this.wsEndpoint)
      this.websocket.onopen = this.onSocketOpen
      this.websocket.onmessage = this.onSocketMessage
      this.websocket.onerror = this.onSocketError
      this.websocket.onclose = this.onSocketClose
    }
  }

  angular.module('profitelo.services.profitelo-websocket', [
    'profitelo.services.utils',
    'commonConfig'
  ])
  .service('profiteloWebsocket', ProfiteloWebsocketService)
}