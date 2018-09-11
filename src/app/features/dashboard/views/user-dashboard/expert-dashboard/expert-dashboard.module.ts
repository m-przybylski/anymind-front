import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ExpertDashboardResolverService } from './services/expert-dashboard-resolver.service';
import { ExpertDashboardConsultationsComponent } from './expert-dashboard-consultation/expert-dashboard-consultation.component';
import { ExpertDashboardComponent } from './expert-dashboard.view.component';
import { DashboardComponentsModule } from '../../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ExpertDashboardComponent, ExpertDashboardConsultationsComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExpertDashboardComponent,
        resolve: { expert: ExpertDashboardResolverService },
        runGuardsAndResolvers: 'always',
      },
    ]),
    CommonModule,
    SharedModule,
    DashboardComponentsModule,
  ],
  providers: [ExpertDashboardResolverService],
})
export class ExpertDashboardModule {}