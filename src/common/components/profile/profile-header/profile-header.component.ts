import {ProfileHeaderComponentController} from './profile-header.controller'
export class ProfileHeaderComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileHeaderComponentController
  template = require('./profile-header.pug')()
  bindings: {[boundProperty: string]: string} = {
    profileDetails: '<',
    isFavourite: '<',
    onLike: '<'
  }
}