namespace profitelo.components.dashboard.settings.modals.security.pinNumber {

  import LoDashStatic = _.LoDashStatic
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  export interface ISecurityPinNumberSettingsControllerScope extends ng.IScope {
  }

  interface IProtectedViewsStatus {
    CALL_VIEW?: boolean,
    PAY_OUT_VIEW?: boolean,
    MAKE_DEPOSIT_VIEW?: boolean
    [key: string]: boolean | undefined
  }

  export class SecurityPinNumberSettingsController implements ng.IController {

    private readonly pinLength: number = 4
    public isPasswordIncorrect: boolean = false
    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public isNewPinTyped: boolean = false
    public confirmPassword: string
    public pinInput : Array<string> = new Array(this.pinLength)
    public patternPassword: string = this.CommonSettingsService.localSettings.passwordPattern
    public protectedViewsStatus: IProtectedViewsStatus = {
      CALL_VIEW: false,
      PAY_OUT_VIEW: false,
      MAKE_DEPOSIT_VIEW: false
    }

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: any,
                private lodash: LoDashStatic, private CommonSettingsService: ICommonSettingsService) {
      AccountApi.getMobileProtectedViews().$promise.then((res: any) => {
        res.protectedViews.forEach((view: string) => {
          this.protectedViewsStatus[view] = true
        })
      }, (err: any) => {
        this.$uibModalInstance.dismiss('cancel')
        throw new Error('Can not get mobile protected views: ' + err)
      })
    }

    public sendPin = () => {
      this.isNewPinTyped = true
    }

    public changeViewsAndPin = (): void => {
      let protectedViews: Array<string> = []
      this.isPasswordIncorrect = false
      this.lodash.each(this.protectedViewsStatus, (val: boolean, key: string) => {
        if (val) {
          protectedViews.push(key)
        }
      })

      this.AccountApi.patchMobileViewsPermissions({
        password: this.confirmPassword,
        mobilePin: this.pinInput.join(''),
        protectedViews: protectedViews
      }).$promise.then((_res: any) => {
        this.$uibModalInstance.dismiss('cancel')
      }, (err: any) => {
        if (err.status === 401) {
          this.isPasswordIncorrect = true
        } else {
          this.$uibModalInstance.dismiss('cancel')
          throw new Error('Can not patch mobile protected views: ' + err)
        }
      })
    }
  }

  angular.module('profitelo.components.dashboard.settings.security.modals.pin-number', [
    'ui.bootstrap',
    'ngLodash',
    'profitelo.services.commonSettings',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.focus-next',
    'profitelo.directives.interface.scrollable',
    'profitelo.directives.interface.pro-checkbox'
  ])
  .controller('securityPinNumberSettingsController', SecurityPinNumberSettingsController)

}
