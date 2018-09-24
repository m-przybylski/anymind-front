import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/date-duration.pipe';
import { ConsultationCommentItemComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-item.component';
import { ConsultationCommentComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment.component';
import { TimeDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/time-duration.pipe';
import { ConsultationCommentAnswerComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-answer/consultation-comment-answer.component';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { SharedModule } from '@platform/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    UserAvatarModule,
    SharedModule,
    ModalsModule,
  ],
  declarations: [
    ConsultationDetailsViewComponent,
    ConsultationCommentComponent,
    ConsultationCommentItemComponent,
    ConsultationCommentAnswerComponent,
    TimeDurationPipe,
    DateDurationPipe,
    ConsultationDetailsComponent,
  ],
  entryComponents: [ConsultationDetailsViewComponent],
})
export class ConsultationDetailsModule {}