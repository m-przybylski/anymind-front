import * as angular from "angular"
import {SoundsService} from "./sounds.service"

const soundsModule = angular.module('profitelo.services.sounds', [
  'ngLodash'
])
  .service('soundsService', SoundsService)
  .name

export default soundsModule;