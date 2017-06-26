import * as angular from 'angular'
import {ProfileHeaderEditComponent} from './profile-header-edit.component'
import './profile-header-edit.sass'
import {GetExpertDetails} from 'profitelo-api-ng/model/models'
import userAvatarModule from '../../../interface/user-avatar/user-avatar'
import profileGalleryModule from '../../../interface/profile-gallery/profile-gallery'
import filtersModule from '../../../../filters/filters'

export interface IProfileHeaderEditComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails,
  profileType: ProfileTypes,
  onDelete?: () => void
  onEdit?: () => void
}

export enum  ProfileTypes {
  'company',
  'expert'
}

const profileHeaderEditModule = angular.module('profitelo.components.wizard.profile-header-edit', [
  'profitelo.directives.pro-social-icon-getter',
  userAvatarModule,
  profileGalleryModule,
  filtersModule
])
.component('profileHeaderEdit', new ProfileHeaderEditComponent())
  .name

export default profileHeaderEditModule
