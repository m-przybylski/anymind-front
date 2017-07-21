import {IWizardAvatarComponentBindings} from './wizard-avatar'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {PostProcessOption} from 'profitelo-api-ng/model/models'
import {FileTypeChecker, FileCategoryEnum} from '../../../classes/file-type-checker'

export class WizardAvatarComponentController implements IWizardAvatarComponentBindings, ng.IController {

  private isUploadInProgress: boolean = false
  private uploadedFile: File
  private uploader: UploaderService
  private isUserUploadImage: boolean = false
  private clearFormAfterCropping: () => void
  private imageSource: string
  public isLoading: boolean = false

  public avatarToken?: string
  public isValid?: boolean
  public isSubmitted?: boolean
  public isFocus: boolean = true
  public isFileUploadError: boolean = false

  private isFileFormatValidError: boolean = false

  /* @ngInject */
  constructor(uploaderFactory: UploaderFactory, private $scope: ng.IScope) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  public addPhoto = (imagePath: string, file: File, callback: () => void): void => {
    if (imagePath.length > 0 && FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR)) {
      this.imageSource = imagePath
      this.isUserUploadImage = true
      this.uploadedFile = file
      this.clearFormAfterCropping = callback
      this.isFileFormatValidError = false
    } else {
      this.isFileFormatValidError = true
    }
    this.$scope.$apply()
  }

  public onFocus = (): void => {
    this.isFocus = true
  }

  public onBlur = (): void => {
    this.isFocus = false
  }

  public removePhoto = (): void => {
    this.avatarToken = void 0
  }

  public saveCrop = (data: any): void => {
    const squareSideLength: number = data.points[2] - data.points[0] - 1
    const postProcessOptions: PostProcessOption = {
      croppingDetails: {
        x: Number(data.points[0]),
        y: Number(data.points[1]),
        width: squareSideLength,
        height: squareSideLength
      }
    }
    this.isLoading = true
    this.isUploadInProgress = true
    this.uploader.uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
    .then(this.onFileUpload, this.onFileUploadError)

    this.isUserUploadImage = false
  }
  private onUploadProgess = (): void => {
    this.isLoading = true
  }

  private onFileUpload = (res: any): void => {
    this.isLoading = false
    this.avatarToken = res.token
    this.isUploadInProgress = false
    this.imageSource = ''
    this.clearFormAfterCropping()
    this.isFocus = true
    this.isFileUploadError = false
  }

  private onFileUploadError = (err: any): void => {
    this.isLoading = false
    this.isFileUploadError = true
    throw new Error('Can not upload file: ' + err)
  }

}
