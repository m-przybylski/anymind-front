import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyDashboardRoutingModule } from './company-dashboard.routing.module';
import { CompanyDashboardGuard } from './services/company-dashboard.guard';

@NgModule({
  imports: [CommonModule, CompanyDashboardRoutingModule],
  declarations: [CompanyDashboardComponent],
  exports: [CompanyDashboardComponent],
  providers: [CompanyDashboardGuard],
})
export class CompanyDashboardModule {}
