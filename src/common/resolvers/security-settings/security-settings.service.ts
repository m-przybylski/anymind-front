namespace profitelo.resolvers.securitySettings {

  import ISessionApi = profitelo.api.ISessionApi
  import GetSession = profitelo.api.GetSession
  export interface ISecuritySettingsService {
    resolve(): ng.IPromise<Array<GetSession>>
  }

  class SecuritySettingsResolver implements ISecuritySettingsService {

    constructor(private SessionApi: ISessionApi, private $log: ng.ILogService) {

    }

    //FIXME after backend models fix
    public resolve = (): any => {
     return this.SessionApi.getSessionsRoute().then((sessionList) => {
        return sessionList
      }, (error: any) => {
        this.$log.error('Can not get sessions list: ' + error)
        return []
      })
    }

  }

  angular.module('profitelo.resolvers.security-settings', [
    'profitelo.api.SessionApi',
  ])
  .service('securitySettingsResolver', SecuritySettingsResolver)

}
