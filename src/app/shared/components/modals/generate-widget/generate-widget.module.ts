import { NgModule } from '@angular/core';
import { GenerateWidgetComponent } from './components/generate-widget/generate-widget.component';
import { GenerateWidgetDataService } from './services/generate-widget.data.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducers/generate-widget.reducer';
import { GenerateWidgetEffects } from './effects/generate-widget.effects';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { GenerateWidgetButtonTypeComponent } from './components/generate-widget-button-type/generate-widget-button-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@platform/shared/shared.module';
import { GenerateWidgetService } from '@platform/shared/components/modals/generate-widget/services/generate-widget.service';

@NgModule({
  declarations: [GenerateWidgetComponent, GenerateWidgetButtonTypeComponent],
  imports: [
    CommonModule,
    ModalComponentsModule,
    ButtonModule,
    SharedModule,
    IconModule,
    StepperModule,
    UserAvatarModule,
    ReactiveFormsModule,
    StoreModule.forFeature('generateWidget', reducer),
    EffectsModule.forFeature([GenerateWidgetEffects]),
    TranslateModule.forChild(),
    ExpertAvailabilityModule,
  ],
  providers: [GenerateWidgetDataService, GenerateWidgetService],
  entryComponents: [GenerateWidgetComponent],
})
export class GenerateWidgetModule {}
