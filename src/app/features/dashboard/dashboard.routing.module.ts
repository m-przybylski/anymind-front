import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from '../../shared/routes/routes';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { CompanyActivitiesComponent } from './views/company-dashboard/company-activities/company-activities.view.component';
import { ClientActivitiesComponent } from './views/user-dashboard/client-activities/client-activities.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { ExpertActivitiesComponent } from './views/user-dashboard/expert-activities/expert-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { CompanyDashboardComponent } from './views/company-dashboard/company-dashboard.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { SettingsViewComponent } from './views/user-dashboard/settings/settings.view.component';
import { CompanyDashboardViewGuard } from './views/company-dashboard/company-dashboard.view.guard';
import { ExpertDashboardComponent } from './views/expert-dashboard/expert-dashboard.view.component';
import { ExpertDashboardResolverService } from './views/expert-dashboard/services/expert-dashboard-resolver.service';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CompanyProfileComponent } from './views/company-dashboard/company-profile/company-profile.view.component';
import { CompanyProfileResolverService } from './views/company-dashboard/services/company-profile-resolver.service';

const routes: Routes = [
  {
    path: 'user',
    component: UserDashboardComponent,
    children: [
      { path: 'discover', component: DiscoverComponent },
      { path: 'client-activities', component: ClientActivitiesComponent },
      { path: 'expert-activities', component: ExpertActivitiesComponent },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'settings', component: SettingsViewComponent },
    ],
  },
  {
    path: RouterPaths.dashboard.company.getName,
    component: CompanyDashboardComponent,
    children: [
      { path: 'employees', component: EmployeesComponent, canActivate: [CompanyDashboardViewGuard] },
      { path: 'activities', component: CompanyActivitiesComponent, canActivate: [CompanyDashboardViewGuard] },
      {
        path: RouterPaths.dashboard.company.profile.getName,
        component: CompanyProfileComponent,
        runGuardsAndResolvers: 'always',
        resolve: { company: CompanyProfileResolverService },
      },
    ],
  },
  {
    path: RouterPaths.dashboard.expert.getName,
    resolve: { expert: ExpertDashboardResolverService },
    component: ExpertDashboardComponent,
    runGuardsAndResolvers: 'always',
    children: [],
  },
  {
    path: RouterPaths.dashboard.notfound.getName,
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CompanyDashboardViewGuard],
})
export class DashboardRoutingModule {}
