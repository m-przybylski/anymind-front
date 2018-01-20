import {Injectable} from '@angular/core';
import {RatelService, SignedAgent} from '@anymind-ng/api';
import * as RatelSdk from 'ratel-sdk-js'
import {CommonConfig, Settings} from '../../../../../generated_modules/common-config/common-config'
import {Call} from 'ratel-sdk-js/dist/call'
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs'
import {catchError, mergeMap} from 'rxjs/operators'
import {ErrorObservable} from 'rxjs/observable/ErrorObservable'
import {Subscription} from 'rxjs/Subscription'
import {Logger} from '../../static/logger/logger';
import {EventsService} from '../../../../angularjs/common/services/events/events.service';
import {Config} from '../../../../config';
import {UserSessionService} from '../../../core/services/user-session/user-session.service';

@Injectable()
export class CommunicatorService {

  private commonConfig: Settings
  private chatConfig: RatelSdk.Config
  private ratelSession?: RatelSdk.Session
  private ratelDeviceId?: string
  private reconnectInterval?: number

  private readonly events = {
    onCallInvitation: new Subject<RatelSdk.events.CallInvitation>(),
    onCallCreated: new Subject<RatelSdk.events.CallCreated>(),
    onRoomInvitation: new Subject<RatelSdk.events.RoomInvitation>(),
    onRoomCreated: new Subject<RatelSdk.events.RoomCreated>(),
    onActiveCall: new Subject<Call[]>(),
    onDisconnectCall: new Subject<void>(),
    onReconnect: new Subject<void>()
  }

  private createRatelConnection = (session: RatelSdk.Session): void => {

    const chat = session.chat

    chat.onCallInvitation((callInvitation: RatelSdk.events.CallInvitation) =>
      this.events.onCallInvitation.next(callInvitation))

    chat.onCallCreated((callCreated: RatelSdk.events.CallCreated) =>
      this.events.onCallCreated.next(callCreated))

    chat.onConnect((hello: RatelSdk.events.Hello) => {
      this.ratelDeviceId = hello.deviceId

      chat.getActiveCalls()
        .then((res) => {
          this.events.onActiveCall.next(res)
        }, (err) => {
          Logger.error('Artichoke: getActiveCalls', err)
        })
      Logger.debug('Artichoke: onConnect', session.id, hello)
    })

    chat.onDisconnect((res: RatelSdk.events.Disconnect) =>
      Logger.debug('Artichoke: onDisconnect', res))

    chat.onError((res: RatelSdk.events.Error) => {
      Logger.error('Artichoke: onError', res)
    })

    chat.onServerUnreachable(() => {
      this.events.onDisconnectCall.next()
      this.reconnectInterval = window.setInterval(() => {
        this.reconnectRatelConnection()
      }, Config.ratel.reconnectInterval)

    })

    chat.onHeartbeat((res: RatelSdk.events.Heartbeat) =>
      Logger.debug('Artichoke: onHeartBeat', res))

    chat.onRoomCreated((roomCreated: RatelSdk.events.RoomCreated) =>
      this.events.onRoomCreated.next(roomCreated))

    chat.onRoomInvitation((roomInvitation: RatelSdk.events.RoomInvitation) =>
      this.events.onRoomInvitation.next(roomInvitation))

    chat.connect()
  }

  constructor(private ratelService: RatelService,
              userSessionService: UserSessionService,
              eventsService: EventsService) {

    this.commonConfig = CommonConfig.settings;
    this.setChatConfig()

    userSessionService.getSession().then(() => this.authenticate().subscribe())
    eventsService.on('login', () => {
      userSessionService.getSession(true).then(() => {
        this.authenticate().subscribe()
      })
    })
    eventsService.on('logout', () => {
      if (this.ratelSession) this.ratelSession.chat.disconnect()
    })
  }

  private reconnectRatelConnection = (): Subscription =>
    this.authenticate()
      .subscribe(() => {
        this.reconnectInterval && window.clearInterval(this.reconnectInterval);
        this.events.onReconnect.next()
        if (this.ratelSession) {
          this.ratelSession.chat.getActiveCalls()
            .then((response) => {
              this.events.onActiveCall.next(response)
            }, Logger.error)
        }
      })

  private setChatConfig = (): void => {
    const ratelUrl = new URL(this.commonConfig.urls.communicator.briefcase)
    const chatUrl = new URL(this.commonConfig.urls.communicator.artichoke)
    this.chatConfig = {
      logLevel: RatelSdk.logger.LogLevel.DEBUG,
      ratel: {
        protocol: ratelUrl.protocol,
        hostname: ratelUrl.hostname,
        port: ratelUrl.port,
      },
      chat: {
        protocol: chatUrl.protocol,
        hostname: chatUrl.hostname,
        port: chatUrl.port,
        rtc: {
          rtcpMuxPolicy: 'negotiate',
          bundlePolicy: 'balanced',
          iceTransportPolicy: 'relay',
          iceServers: [{
            urls: ['stun:turn.ratel.im:443', 'turn:turn.ratel.im:443'],
            username: 'test123',
            credential: 'test456'
          }]
        }
      }
    }
  }

  private onCreateClientSession = (session: RatelSdk.Session): void => {
    this.ratelSession = session;

    this.createRatelConnection(session)
    this.ratelService.postBriefcaseUserConfigRoute({id: session.id})
      .subscribe(
        () => Logger.debug('Client session created', session),
        () => Logger.error('Post Briefcase User Config failed')
      )
  }

  private onGetRatelClientAuthConfig = (clientConfig: SignedAgent): Promise<void> =>
    RatelSdk.withSignedAuth(clientConfig as RatelSdk.SessionData, this.chatConfig).then(this.onCreateClientSession)

  private authenticateClient = (): Observable<void> =>
    this.ratelService.getRatelAuthConfigRoute().pipe(mergeMap(this.onGetRatelClientAuthConfig))

  private onAuthenticateError = (err: any): ErrorObservable => {
    Logger.error(err)
    return Observable.throw(err);
  }

  public authenticate = (): Observable<void | {}> =>
    this.authenticateClient().pipe(catchError(this.onAuthenticateError))

  public getClientSession = (): RatelSdk.Session | undefined =>
    this.ratelSession;

  public getClientDeviceId = (): string | undefined =>
    this.ratelDeviceId;

  public onCallInvitation = (callback: (callInvitation: RatelSdk.events.CallInvitation) => void): Subscription =>
    this.events.onCallInvitation.subscribe(callback)

  public onRoomInvitation = (callback: (roomInvitation: RatelSdk.events.RoomInvitation) => void): Subscription =>
    this.events.onRoomInvitation.subscribe(callback)

  public onActiveCall = (callback: (activeCalls: Call[]) => void): Subscription =>
    this.events.onActiveCall.subscribe(callback)

  public onDisconnectCall = (callback: () => void): Subscription =>
    this.events.onDisconnectCall.subscribe(callback)

  public onReconnect = (callback: () => void): Subscription =>
    this.events.onReconnect.subscribe(callback)
}
