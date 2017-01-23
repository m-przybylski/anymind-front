module profitelo.services.smoothScrolling {

  export interface ISmoothScrollingService {
    scrollTo(elementId: string): void
    simpleScrollTo(element: HTMLElement, isNavbar: boolean, time: number): void
  }

  class SmoothScrollingService implements ISmoothScrollingService {

    constructor(private $timeout: ng.ITimeoutService) {
    }

    public scrollTo = (eID) => {

      const currentYPosition = () => {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
          return self.pageYOffset
        }
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop
        }

        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
          return document.body.scrollTop
        }
        return 0
      }

      const elmYPosition = (id) => {
        let elm = document.getElementById(id)
        let y = elm.offsetTop
        let node = elm
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = <HTMLElement>node.offsetParent
          y += node.offsetTop
        }
        return y
      }

      let startY = currentYPosition()
      let stopY = elmYPosition(eID)
      let distance = stopY > startY ? stopY - startY : startY - stopY
      if (distance < 100) {
        scrollTo(0, stopY)
        return null
      }
      let speed = 3

      let step = Math.round(distance / 25)
      let leapY = stopY > startY ? startY + step : startY - step
      let timer = 0

      let scrollFunction = () => {

        if (stopY > leapY) {
          window.scrollTo(0, leapY)
          leapY += step
          if (leapY > stopY) {
            leapY = stopY
          }
          if (timer * speed < 30) {
            timer += 1
          }
          this.$timeout(() => {
            scrollFunction()
          }, speed * timer)
        }

      }
      scrollFunction()
    }

    public simpleScrollTo = (element, isNavbar, time = 1000) => {
      let scrollTop = $(element).offset().top

      if (isNavbar) {
        scrollTop -= 80 + 32
      }

      $('html, body').animate({
        scrollTop: scrollTop
      }, time)

      $(window).on('wheel', () => {
        $('html, body').stop(true, false)
      })

    }
  }

  angular.module('profitelo.services.smooth-scrolling', [])
  .config(($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('smoothScrollingService', SmoothScrollingService)
}