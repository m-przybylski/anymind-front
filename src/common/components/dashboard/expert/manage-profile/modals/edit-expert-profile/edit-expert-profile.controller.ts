import {IDropdownInputDictionary} from '../../../../../interface/input-dropdown-tag/input-dropdown-tag.controller'
export interface IEditExpertProfileScope extends ng.IScope {
}

export class EditExpertProfileController implements ng.IController {
  public isLoading: boolean = false
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public inputText: string
  public textareaDescription: string
  readonly inputMaxLength: number
  public tagsMocks: IDropdownInputDictionary
  public companyPathModel = {
    links: ''
  }
  public isAvatarUploaded: boolean = false

  public onModalClose = () =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    this.inputText = ''
    this.textareaDescription = ''
    this.inputMaxLength = 150

    this.tagsMocks = {
      pl: 'Polish',
      en: 'English',
      ro: 'Romanian'
    }

  }
}