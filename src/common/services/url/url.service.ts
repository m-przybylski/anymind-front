import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import * as _ from 'lodash'

interface ISocialUrl {
  iconClass: string,
  name: string,
  pattern: RegExp
}

export class UrlService {

  private commonConfig: any

  /* @ngInject */
  constructor(private CommonSettingsService: any,  CommonConfig: CommonConfig) {
    this.commonConfig = CommonConfig.getAllData()
  }

  public resolveSocialUrl = (remoteUrl: string): ISocialUrl | undefined => {
    const _socialNetworks: ISocialUrl[] = this.CommonSettingsService.localSettings.socialNetworks

    for (let i = 0; i < _socialNetworks.length; i++) {
      const social = _socialNetworks[i]
      if (remoteUrl.match(social.pattern)) {
        return social
      }
    }

    return _.find(_socialNetworks, {
      name: 'Website'
    })
  }

  public resolveFileUrl = (fileId: string): string => {
    return this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', fileId)
  }
}
