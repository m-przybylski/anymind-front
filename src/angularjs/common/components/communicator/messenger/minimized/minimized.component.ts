import {MessengerMinimizedComponentController} from './minimized.controller'

export class MessengerMinimizedComponent implements ng.IComponentOptions {
  template = require('./minimized.html')
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerMinimizedComponentController
  bindings: {[boundProperty: string]: string} = {
    onMessageClick: '<'
  }
}