import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordViewComponent } from './components/change-password/change-password.view.component';
import { ChangeEmailViewComponent } from './components/change-email/change-email.view.component';
import { ManageSessionsViewComponent } from './components/manage-sessions/manage-sessions.view.component';
import { MsisdnSettingsViewComponent } from './components/msisdn-settings/msisdn-settings.view.component';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { delay } from 'rxjs/operators';
import { Config } from '../../../../../../config';
import { ChangeLanguageComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-language/change-language.component';

@Component({
  selector: 'plat-settings',
  templateUrl: './settings.view.component.html',
  styleUrls: ['./settings.view.component.sass'],
})
export class SettingsViewComponent implements OnInit {
  public session$: Observable<GetSessionWithAccount>;

  constructor(private ngbModalService: NgbModal, private store: Store<fromCore.IState>) {}

  public ngOnInit(): void {
    this.session$ = getNotUndefinedSession(this.store).pipe(delay(Config.contentLoaderDelayMilliseconds));
  }

  public languageByKey(key: string): string {
    return Object.create(Config.languages)[key];
  }

  public openChangeNumberModal = (): void => {
    this.ngbModalService.open(MsisdnSettingsViewComponent);
  };

  public openChangePasswordModal = (): void => {
    this.ngbModalService.open(ChangePasswordViewComponent);
  };

  public openChangeEmailModal = (): void => {
    this.ngbModalService.open(ChangeEmailViewComponent);
  };

  public openManageSessionsModal = (): void => {
    this.ngbModalService.open(ManageSessionsViewComponent);
  };

  public openChangeLanguageModal(): void {
    this.ngbModalService.open(ChangeLanguageComponent);
  }
}
