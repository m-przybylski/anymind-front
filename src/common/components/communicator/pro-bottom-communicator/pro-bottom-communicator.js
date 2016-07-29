(function() {

  /* @ngInject */
  function controllerFunction($scope) {


    this.isVisible = false
    this.showChat = false

    let _wasChatShown = false

    $scope.$on('toggleChat', () => {

      if (this.isVisible) {
        _wasChatShown = this.showChat
        this.showChat = false
      } else {
        this.showChat = _wasChatShown
      }

      this.isVisible = !this.isVisible


    })

    this.isFullScreenMode = false

    this.toggleFullScreen = () => {
      this.isFullScreenMode = !this.isFullScreenMode
    }

    this.toggles = {
      chat: () => {
        this.showChat = !this.showChat
      }
    }

    return this

  }


  let proBottomCommunicator = {
    transclude: true,
    replace: true,
    templateUrl:    'components/communicator/pro-bottom-communicator/pro-bottom-communicator.tpl.html',
    controllerAs: 'vm',
    controller: controllerFunction
  }

  angular.module('profitelo.components.communicator.pro-bottom-communicator', [
    'pascalprecht.translate',
    'profitelo.components.communicator.pro-video-chat.pro-video-chat-top-navbar',
    'profitelo.components.communicator.pro-text-chat',
    'profitelo.components.communicator.pro-video-chat'
  ])
    .component('proBottomCommunicator', proBottomCommunicator)

}())