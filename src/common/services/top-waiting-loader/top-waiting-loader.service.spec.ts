import * as angular from 'angular'
import {TopWaitingLoaderService} from './top-waiting-loader.service'

describe('Unit testing: profitelo.services.pro-top-waiting-loader-service >', () => {
  describe('for profitelo.services.pro-top-waiting-loader-service >', () => {

    let topWaitingLoaderService: TopWaitingLoaderService

    beforeEach(() => {
      angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      topWaitingLoaderService = $injector.get<TopWaitingLoaderService>('topWaitingLoaderService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should run immediate function and callback', inject(($timeout: ng.ITimeoutService,
                                                             $interval: ng.IIntervalService) => {

      const cbs = {
        progressCallback: (): void => {
        }
      }

      spyOn($interval, 'cancel').and.callThrough()
      spyOn(cbs, 'progressCallback')

      topWaitingLoaderService.bindProgress(cbs.progressCallback)
      topWaitingLoaderService.immediate()
      $timeout.flush()
      $interval.flush(10000)

      expect($interval.cancel).toHaveBeenCalled()
      expect(cbs.progressCallback).toHaveBeenCalled()
    }))

  })
})
