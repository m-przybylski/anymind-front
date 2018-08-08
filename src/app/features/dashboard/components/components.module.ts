import { SocialLinksComponent } from './social-links.ts/social-links';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ConsultationRowComponent } from './consultation-row/consultation-row.component';
import { ConsultationStatComponent } from './consultation-stat/consultation-stat.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { EmptyNumberPipe } from './pipes/empty-number.pipe';
import { ExpertAvailabilityComponent } from './expert-availability/expert-availablitiy.component';
import { DashboardProfileHeaderComponent } from './dashboard-profile-header/dashboard-profile-header.component';
import { ConsultationCompanyRowComponent } from './consultation-company-row/consultation-company-row.component';
import { ConsultationExpertsComponent } from './consultation-experts/consultation-experts.component';
import { IconModule, ButtonModule } from '../../../shared/components/atomic-components/index';
import { UserAvatarModule } from '../../../shared/components/user-avatar/user-avatar.module';

@NgModule({
  imports: [CommonModule, SharedModule, AnymindComponentsModule, IconModule, ButtonModule, UserAvatarModule],
  declarations: [
    SocialLinksComponent,
    ConsultationRowComponent,
    ConsultationCompanyRowComponent,
    ConsultationExpertsComponent,
    ConsultationStatComponent,
    ExpertAvailabilityComponent,
    DashboardProfileHeaderComponent,
    EmptyNumberPipe,
  ],
  exports: [
    SocialLinksComponent,
    ConsultationRowComponent,
    ConsultationCompanyRowComponent,
    ConsultationExpertsComponent,
    ConsultationStatComponent,
    ExpertAvailabilityComponent,
    DashboardProfileHeaderComponent,
    IconModule,
    ButtonModule,
  ],
})
export class DashboardComponentsModule {}
