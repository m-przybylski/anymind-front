(function() {
  function smoothScrolling() {

    let _scrollTo = function(eID) {

      function currentYPosition() {
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

      function elmYPosition(id) {
        let elm = document.getElementById(id)
        let y = elm.offsetTop
        let node = elm
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent
          y += node.offsetTop
        } return y
      }

      let startY = currentYPosition()
      let stopY = elmYPosition(eID)
      let distance = stopY > startY ? stopY - startY : startY - stopY
      if (distance < 100) {
        scrollTo(0, stopY)
        return null
      }
      let speed = 20


      let step = Math.round(distance / 25)
      let leapY = stopY > startY ? startY + step : startY - step
      let timer = 0
      if (stopY > startY) {
        for ( let i=startY; i<stopY; i+=step ) {
          setTimeout('window.scrollTo(0, '+leapY+')', timer * speed)
          leapY += step
          if (leapY > stopY) {
            leapY = stopY
          } timer++
        } return
      }
      for ( let i=startY; i>stopY; i-=step ) {
        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed)
        leapY -= step; if (leapY < stopY) {
          leapY = stopY
        } timer++
      }


    }

    return {
      scrollTo: _scrollTo
    }

  }
  angular.module('profitelo.directives.services.smooth-scrolling', [])
    .service('smoothScrolling', smoothScrolling)
}())