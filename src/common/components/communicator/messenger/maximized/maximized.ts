import * as angular from "angular"
import {MoneyDto} from "../../../../api/model/MoneyDto"
import {MessengerMaximizedComponent} from "./maximized.component"
import urlModule from "../../../../services/url/url"
import uploaderModule from "../../../../services/uploader/uploader"
import filtersModule from "../../../../filters/filters"
import "./grouped-messages/grouped-messages"
import "./messenger-input/messenger-input"

export interface IMessengerMaximizedComponentBindings {
  callCost: MoneyDto
  isMessenger: boolean
  minimizeMessenger: Function
  callLength: number
}

const messengerMaximizedModule = angular.module('profitelo.components.communicator.messenger.maximized', [
  urlModule,
  uploaderModule,
  'ngLodash',
  filtersModule,
  'profitelo.components.communicator.messenger.maximized.grouped-messages',
  'profitelo.components.communicator.messenger.maximized.messenger-input'
])
  .component('messengerMaximized', new MessengerMaximizedComponent)
  .name

export default messengerMaximizedModule;
