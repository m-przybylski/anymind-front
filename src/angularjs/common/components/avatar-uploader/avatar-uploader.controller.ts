import {IAvatarUploaderComponentBindings} from './avatar-uploader'
import {UploaderFactory} from '../../services/uploader/uploader.factory'
import {UploaderService} from '../../services/uploader/uploader.service'
import {PostProcessOption} from 'profitelo-api-ng/model/models'
import {FileTypeChecker, FileCategoryEnum} from '../../classes/file-type-checker/file-type-checker'
import {CommonSettingsService} from '../../services/common-settings/common-settings.service'

export class AvatarUploaderComponentController implements IAvatarUploaderComponentBindings, ng.IController {

  public uploadedFile: File
  public isUserUploadImage: boolean = false
  public imageSource: string
  public isLoading: boolean = false
  public avatarToken?: string
  public isValid?: boolean
  public isSubmitted?: boolean
  public isFocus: boolean = true
  public isFileUploadError: boolean = false
  public isFileFormatError: boolean = false
  public isFileSizeError: boolean = false

  private isUploadInProgress: boolean = false
  private uploader: UploaderService
  private clearFormAfterCropping: () => void
  private maxValidAvatarSize: number = this.CommonSettingsService.localSettings.profileAvatarSize

    constructor(private $scope: ng.IScope,
              private CommonSettingsService: CommonSettingsService,
              uploaderFactory: UploaderFactory) {
    this.uploader = uploaderFactory.getInstance()
  }

  public addPhoto = (imagePath: string, file: File, callback: () => void): void => {
    if (imagePath.length > 0
      && FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR)
      && this.isFileSizeValid(file)) {
      this.imageSource = imagePath
      this.isUserUploadImage = true
      this.uploadedFile = file
      this.clearFormAfterCropping = callback
      this.isFileFormatError = false
      this.isFileSizeError = false
    }

    this.isFileFormatError = !FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR)

    this.isFileSizeError = !this.isFileSizeValid(file)

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
    const indexOfSecondXPoint: number = 2
    const squareSideLength: number = data.points[indexOfSecondXPoint] - data.points[0] - 1
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
    this.uploader.uploadFile(this.uploadedFile, postProcessOptions, () => {})
    .then(this.onFileUpload, this.onFileUploadError)

    this.isUserUploadImage = false
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
    throw new Error('Can not upload file: ' + String(err))
  }

  private isFileSizeValid = (file: File): boolean => file.size <= this.maxValidAvatarSize

}