import {IInputLinksComponentBindings} from './input-links'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

export class InputLinksComponentController implements IInputLinksComponentBindings, ng.IController {

  public selectedLinks: string[] = []
  public linkModel: string
  public urlPattern: any
  public badUrl: boolean = false
  public urlExist: boolean = false
  public noUrl: boolean = false
  public label?: string

    constructor(CommonSettingsService: CommonSettingsService) {
    this.urlPattern = CommonSettingsService.localSettings.urlPattern
  }

  $onInit(): void {

  }

  public removeLink = (linkToDelete: string): void => {
    const index = this.selectedLinks.indexOf(linkToDelete)
    this.selectedLinks.splice(index, 1)
  }

  public checkLinkExist = (link: string): boolean => this.selectedLinks.indexOf(link) !== -1

  public onAddLink = (): void => {
    this.urlExist = false
    if (!this.linkModel.match(this.urlPattern) && !this.isHttpAdded()) {
      this.linkModel = 'http://' + this.linkModel.toLowerCase()
    }

    if (this.urlPattern.test(this.linkModel)) {
      this.badUrl = false
      if (this.checkLinkExist(this.linkModel)) {
        this.urlExist = true
      } else {
        this.selectedLinks.push(this.linkModel.toLowerCase())
        this.linkModel = ''
      }
    } else {
      this.badUrl = true
      this.noUrl = false
    }
  }

  private isHttpAdded = (): boolean => this.linkModel.includes('http://')

}