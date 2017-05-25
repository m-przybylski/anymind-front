import * as angular from 'angular'
import {WizardStepModuleComponent} from './wizard-step.component'
import './wizard-step.sass'

export interface IWizardStepModuleComponentBindings extends ng.IController {
  onClickNext: () => void,
  onClickBack: () => void,
  title: string
}

const wizardStepModule = angular.module('profitelo.components.wizard.wizard-step', [
    'pascalprecht.translate'
  ])
  .component('wizardStep', new WizardStepModuleComponent)
    .name

export default wizardStepModule
