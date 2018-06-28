// tslint:disable:curly
import { PromiseService } from '../../../services/promise/promise.service';
import { StateService, StateObject } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class PagePreloaderComponentController implements ng.IController {

  public isLoading = false;
  public isError = false;
  private static readonly minimalPreloadingTime = 500;
  private static readonly minimalTimeToStartPreloading = 500;
  private isStateLoaded = false;
  private stateChangeStart: () => void;
  private stateChangeSuccess: () => void;
  private stateChangeError: () => void;
  private toStateName: string;
  private toStateParams: { [key: string]: string };

  public static $inject = ['$rootScope', '$timeout', 'promiseService', '$log', '$state'];

    constructor(private $rootScope: ng.IRootScopeService,
              private $timeout: ng.ITimeoutService,
              private promiseService: PromiseService,
              private $log: ng.ILogService,
              private $state: StateService) {
  }

  public $onInit = (): void => {
    this.stateChangeStart =
      this.$rootScope.$on('$stateChangeStart', (_event, toState, _toParams, fromState, _fromParams) => {
        if (this.doesResolverExist(toState) && !this.areStatesNamesEqual(toState, fromState)) {
          this.isStateLoaded = false;
          this.setIsLoading();
          this.isError = false;
        }
      });

    this.stateChangeSuccess =
      this.$rootScope.$on('$stateChangeSuccess', (_event, toState, _toParams, fromState, _fromParams) => {
        if (this.doesResolverExist(toState) && !this.areStatesNamesEqual(toState, fromState)) {
          this.isStateLoaded = true;
          this.isLoading = false;
        }
      });

    this.stateChangeError =
      this.$rootScope.$on('$stateChangeError', (_event, toState, toParams, fromState, _fromParams, error) => {
      if (this.doesResolverExist(toState) && !this.areStatesNamesEqual(toState, fromState)) {
          this.toStateName = toState.name;
          this.toStateParams = toParams;

          this.isStateLoaded = true;
          this.isLoading = false;
          this.isError = true;
          this.$log.error(error);
        }
      });
  }

  public $onDestroy = (): void => {
    this.stateChangeStart();
    this.stateChangeSuccess();
    this.stateChangeError();
  }

  public onStateReload = (): void => {
    this.$state.go(this.toStateName, this.toStateParams);
  }

  private setIsLoading = (): void => {
    if (this.isError) this.isLoading = true;
    else this.promiseService.setMinimalDelay(
      this.$timeout(() => {
        this.isLoading = !this.isStateLoaded;
      }, PagePreloaderComponentController.minimalTimeToStartPreloading),
      PagePreloaderComponentController.minimalPreloadingTime);
  }

  private doesResolverExist = (toState: StateObject): boolean => typeof toState.resolve !== 'undefined';

  private areStatesNamesEqual = (toState: StateObject, fromState: StateObject): boolean =>
    toState.name === fromState.name

}
