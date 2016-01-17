angular.module('profitelo', [
  'ngMessages',
  'authorization',
  'templates-module',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'ngCookies',

  // services
  'profitelo.services.customTranslationHandler',
  'profitelo.services.wizardSectionControl',

  // controllers
  'profitelo.controller.dashboard',
  'profitelo.controller.dashboard.start',

  'profitelo.controller.home',
  'profitelo.controller.expert-profile',
  'profitelo.controller.expert-progress',
  'profitelo.controller.registration',
  'profitelo.controller.wizards',
  'profitelo.controller.wizards.create-new-service',


  // directives
  'profitelo.directives.pro-registration',
  'profitelo.directives.pro-registration-input',
  'profitelo.directives.pro-expert-progress',
  'profitelo.directives.pro-progress-box',
  'profitelo.directives.pro-progress-bar',
  'profitelo.directives.pro-expert-profile',

  // rest
  'profitelo.api.accounts',
  'profitelo.api.registration',
  'profitelo.api.sessions',
  'profitelo.api.accountsStatus',
  'profitelo.api.industry',

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])

.config(($urlRouterProvider, $stateProvider, $resourceProvider, $translateProvider, tmhDynamicLocaleProvider, toastrConfig) => {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppController',
    templateUrl: 'templates/app.tpl.html',
    resolve: {
      typeKit: ($q) => {

        var deferred = $q.defer()

        let config = {
            kitId: 'gxk2sou',
            scriptTimeout: 3000,
            async: true,
            active: function() {
              deferred.resolve()
            }
          },
          h = document.documentElement, t = setTimeout(() => {
            h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
          }, config.scriptTimeout), tk = document.createElement('script'), f = false, s = document.getElementsByTagName('script')[0], a
        h.className += ' wf-loading'
        tk.src = 'https://use.typekit.net/' + config.kitId + '.js'
        tk.async = true
        tk.onload = tk.onreadystatechange = function() {
          a = this.readyState
          if (f || a && a !== 'complete' && a !== 'loaded') {
            return
          }
          f = true
          clearTimeout(t)
          try {
            Typekit.load(config)
          } catch (e) {
            deferred.reject(e)
          }
        }
        s.parentNode.insertBefore(tk, s)

        return deferred.promise
      }
    }
  })
  $urlRouterProvider
    .when('', '/')
    .when('/', '/home')


  // ngResource
  $resourceProvider.defaults.stripTrailingSlashes = true

  // Toastr
  angular.extend(toastrConfig, {
    newestOnTop: true,
    positionClass: 'toast-bottom-right',

    allowHtml: false,
    closeButton: false,
    closeHtml: '<button>&times</button>',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: false,
    tapToDismiss: true,
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  })


  /**
   * Translations (angular translate)
   */

  // use interpolation for translation
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation')

  // Warnings, regarding forgotten IDs in translations
  $translateProvider.useMissingTranslationHandler('CustomTranslationHandlerService')

  // Set a fallback language in case there find no other
  $translateProvider.fallbackLanguage('en-us')

  /**
   *  Set default language**
   *  This method tries to resolve language by user locale
   */
  $translateProvider.registerAvailableLanguageKeys([
    'en-us',
    'pl-pl'
  ], {
    'en_US':  'en-us',
    'en-en':  'en-us',
    'en':     'en-us', // NOTE: change/remove if international version will be added
    'pl_PL':  'pl-pl',
    'pl':     'pl-pl'
  }).determinePreferredLanguage()

  $translateProvider.useSanitizeValueStrategy(null)

  // configure loading angular locales
  tmhDynamicLocaleProvider.localeLocationPattern('assets/angular-i18n/angular-locale_{{locale}}.js')
})

.run(($rootScope) => {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log('$stateChangeError', error)
  })

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
    if (angular.isDefined(toState.data) && angular.isDefined(toState.data.hideDashboardMenu)) {
      $rootScope.hideDashboardMenu = toState.data.hideDashboardMenu
    } else {
      $rootScope.hideDashboardMenu = false
    }
  })

})

.controller('AppController', AppController)


function AppController($scope, $rootScope) {
  var vm = this

  $rootScope.gitCommit = lastCommitMessage

  return vm
}
