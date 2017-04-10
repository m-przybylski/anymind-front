import {ClientActivityComponentController} from './activity.controller'

export class ClientActivityComponent implements ng.IComponentOptions {
  template = require('./activity.pug')()
  controller: ng.Injectable<ng.IControllerConstructor> = ClientActivityComponentController
  controllerAs: string = '$ctrl'
  bindings: {[boundProperty: string]: string} = {
    activity: '<'
  }
}