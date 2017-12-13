import {AppComponentController} from './app.controller'
import {Config} from './config';

/* @ngInject */
export function AppConfigFunction($urlRouterProvider: ng.ui.IUrlRouterProvider, $httpProvider: ng.IHttpProvider,
                        $stateProvider: ng.ui.IStateProvider,
                        $translateProvider: ng.translate.ITranslateProvider, $locationProvider: ng.ILocationProvider,
                        $animateProvider: ng.animate.IAnimateProvider,
                        tmhDynamicLocaleProvider: ng.dynamicLocale.tmhDynamicLocaleProvider): void {

  $urlRouterProvider.deferIntercept()

  if (Config.isPlatformForExpert) {
    $urlRouterProvider
      .otherwise('/dashboard/settings/general')
  } else {
    $urlRouterProvider
      .otherwise('/home')
  }

  $httpProvider.defaults.withCredentials = true

  $animateProvider.classNameFilter(/animation/)

  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: AppComponentController,
    controllerAs: 'appController',
    template: require('./app.pug')(),
    data: {
      pageTitle: 'PAGE_TITLE.BASE'
    },
    resolve: {
      browserType: (): boolean => {
        if (navigator.userAgent.indexOf('MSIE') !== -1) {
          document.querySelector('body')!.classList.add('is-ie')
        }
        return true
      }
    }
  })

  $locationProvider.html5Mode(true)

  /**
   * Translations (angular translate)
   */

  // use interpolation for translation
  // $translateProvider.addInterpolation('$translateMessageFormatInterpolation')

  // Warnings, regarding forgotten IDs in translations
  $translateProvider.useMissingTranslationHandler('CustomTranslationHandlerService')

  // Set a fallback language in case there find no other
  $translateProvider.fallbackLanguage('pl-pl')

  /**
   *  Set default language**
   *  This method tries to resolve language by user locale
   */
  $translateProvider.registerAvailableLanguageKeys([
    'en-us',
    'pl-pl'
  ], {
    'en-en': 'en-us',
    en: 'en-us', // NOTE: change/remove if international version will be added
    pl_PL: 'pl-pl',
    pl: 'pl-pl'
  }).determinePreferredLanguage()

  $translateProvider.useSanitizeValueStrategy('')

  // configure loading angular locales
  tmhDynamicLocaleProvider.localeLocationPattern('assets/angular-i18n/angular-locale_{{locale}}.js')
}
