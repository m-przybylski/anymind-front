namespace profitelo.components.communicator.messenger.maximized.input {

  export interface IMessengerInputBindings {
    onSendMessage: (text: string) => void
    onUploadFiles: (files: Array<File>) => void
    onTyping: () => void
    isFileUploading: boolean
  }

  export class MessengerInputComponentController implements IMessengerInputBindings {

    public onSendMessage: (text: string) => void
    public onUploadFiles: (files: Array<File>) => void
    public onTyping: () => void
    public isFileUploading: boolean
    public inputModel: string = ''

    /* @ngInject */
    constructor() {
    }

    public sendMessage = (text: string) => {
      if (text !== '') {
        this.onSendMessage(text)
        this.inputModel = ''
      }
    }

    public uploadFiles = (files: Array<File>) => {
      if (!this.isFileUploading) {
        this.onUploadFiles(files)
      }
    }

    public onKeyup = (event: any) => {
      if (event.key !== 'Enter') {
        this.onTyping()
      }
    }
  }

  class MessengerInputComponent {
    template = require('./messenger-input.pug')()
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerInputComponentController
    bindings: {[boundProperty: string]: string} = {
      onSendMessage: '<',
      onUploadFiles: '<',
      onTyping: '<',
      isFileUploading: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.maximized.messenger-input', [
    'pascalprecht.translate'
  ])
  .component('messengerInput', new MessengerInputComponent())
}
