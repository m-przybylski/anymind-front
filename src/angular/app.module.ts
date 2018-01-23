import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { AngularJsBootstrapSingletonService } from './upgrade/angularjs-bootstrap-singleton.service';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UpgradeModule
  ],
  providers: [
    AngularJsBootstrapSingletonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {}
}
