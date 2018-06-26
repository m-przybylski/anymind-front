import { NgModule } from '@angular/core';
import { ModalsModule } from '../../modals/modals.module';
import { NgxImgModule } from 'ngx-img';
import { InputAddLinkComponent } from './profile-links/input-link/input-link.component';
import { AvatarUploaderDirective } from './basic-profile-data/avatar-uploader/avatar-uploader.directive';
import { EditProfileModalComponent } from './edit-profile.component';
import { ImageCropModalComponent } from './basic-profile-data/image-crop/image-crop.component';
import { ProfileLinksComponent } from './profile-links/profile-links.component';
import { BasicProfileDataComponent } from './basic-profile-data/basic-profile-data.component';
import { AvatarUploaderComponent } from './basic-profile-data/avatar-uploader/avatar-uploader.component';
import { EditProfileModalComponentService } from './edit-profile.component.service';

@NgModule({
  imports: [
    ModalsModule,
    NgxImgModule
  ],
  entryComponents: [EditProfileModalComponent, ImageCropModalComponent],
  providers: [EditProfileModalComponentService],
  declarations: [
    BasicProfileDataComponent,
    EditProfileModalComponent,
    ProfileLinksComponent,
    InputAddLinkComponent,
    ImageCropModalComponent,
    AvatarUploaderComponent,
    AvatarUploaderDirective
  ]
})
export class EditProfileModalModule { }
