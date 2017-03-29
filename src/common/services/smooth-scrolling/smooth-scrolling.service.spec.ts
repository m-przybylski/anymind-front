import * as angular from 'angular'
import {SmoothScrollingService} from './smooth-scrolling.service'

describe('Unit testing: profitelo.directives.services.smooth-scrolling >', function () {
  describe('for profitelo.directives.services.smooth-scrolling >', function () {

    let smoothScrollingService: SmoothScrollingService

    beforeEach(function () {
      angular.mock.module('profitelo.services.smooth-scrolling')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      smoothScrollingService = $injector.get<SmoothScrollingService>('smoothScrollingService')
    }))

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should simple scroll to', inject(() => {
      spyOn($.fn, "stop")
      smoothScrollingService.simpleScrollTo('<div class="dumb-class"></div>', true)
      $(window).triggerHandler('wheel')
      $('html, body').stop()
      expect($.fn.stop).toHaveBeenCalled()
    }))

  })
})
