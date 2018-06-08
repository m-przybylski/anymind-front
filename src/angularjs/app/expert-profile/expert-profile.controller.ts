import { IExpertProfileStateParams } from './expert-profile';
import { ProfileApi } from 'profitelo-api-ng/api/api';
import { GetExpertProfile, GetExpertDetails, GetExpertServiceDetails } from 'profitelo-api-ng/model/models';
import { ProfileTypes } from '../../common/components/profile/profile-header/profile-header.controller';

// tslint:disable:member-ordering
export class ExpertProfileController {

  public profile: GetExpertDetails | undefined;
  public consultations: GetExpertServiceDetails[];
  public isFavourite: boolean;
  public profileType: ProfileTypes;
  public profileId: string;

  public static $inject = ['$stateParams', '$log', 'expertProfile', 'ProfileApi'];

  constructor(private $stateParams: IExpertProfileStateParams, private $log: ng.ILogService,
              expertProfile: GetExpertProfile, private ProfileApi: ProfileApi) {

    this.profile = expertProfile.profileWithDocuments.profile.expertDetails;
    this.consultations = expertProfile.services;
    this.isFavourite = expertProfile.isFavourite;
    this.profileType = ProfileTypes.expert;
    this.profileId = expertProfile.profileWithDocuments.profile.id;
  }

  public onProfileLike = (): boolean =>
    this.isFavourite = true

  public onProfileLikeError = (error: any): void =>
    this.$log.error('Can not like this company because: ' + String(error))

  public onProfileDislike = (): boolean =>
    this.isFavourite = false

  public onProfileDislikeError = (error: any): void =>
    this.$log.error('Can not dislike this company because: ' + String(error))

  public handleLike = (): void => {
    if (!this.isFavourite) {
      this.ProfileApi.postProfileFavouriteExpertRoute(this.$stateParams.profileId)
        .then(this.onProfileLike, this.onProfileLikeError);
    } else {
      this.ProfileApi.deleteProfileFavouriteExpertRoute(this.$stateParams.profileId)
        .then(this.onProfileDislike, this.onProfileDislikeError);
    }
  }

}
