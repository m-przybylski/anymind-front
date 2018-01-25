import {Config} from 'ratel-sdk-js';
import {CommonConfig} from '../../../../../generated_modules/common-config/common-config';

export function CommunicatorConfigFactory(): Config {

  const ratelUrl = new URL(CommonConfig.settings.urls.communicator.briefcase)
  const chatUrl = new URL(CommonConfig.settings.urls.communicator.artichoke)

  return {
    logLevel: 0, // DEBUG
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
  };
}