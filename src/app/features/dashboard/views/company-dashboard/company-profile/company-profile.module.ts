import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { DashboardComponentsModule } from '../../../components/components.module';
import { RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './company-profile.view.component';
import { CompanyProfileConsultationsComponent } from './company-profile-consultation/company-profile-consultation.component';
import { CompanyProfileResolverService } from './services/company-profile-resolver.service';

@NgModule({
  declarations: [CompanyProfileComponent, CompanyProfileConsultationsComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CompanyProfileComponent,
        runGuardsAndResolvers: 'always',
        resolve: { company: CompanyProfileResolverService },
      },
    ]),
    CommonModule,
    SharedModule,
    DashboardComponentsModule,
  ],
  providers: [CompanyProfileResolverService],
})
export class CompanyProfileModule {}