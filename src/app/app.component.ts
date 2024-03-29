import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService, SeoService } from '@anymind-ng/core';
import { VERSION } from '../../generated_modules/version/version';
import { EnvironmentService } from './core/services/environment/environment.service';
import { CallInvitationService } from './core/services/call/call-invitation.service';
import * as moment from 'moment';
import { RemoteLogoutService } from '@platform/core/services/remote-logout/remote-logout.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private logger: LoggerService,
    private expertCallService: CallInvitationService,
    private remoteLogoutService: RemoteLogoutService,
    private callSessionService: CallSessionService,
    private seoService: SeoService,
  ) {
    this.printVersion();
    this.printEnvironment();

    // no maintain of english translations. Turn back on when
    // specific decision is taken
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|pl/) ? browserLang : 'pl');

    moment.locale('pl-PL');

    // Initialize communicator after translations are loaded
    this.callSessionService.listenForSession();
    this.expertCallService.initialize();

    this.remoteLogoutService.listenForRemovedSession();
  }

  public ngOnInit(): void {
    this.seoService.init();
  }

  private printVersion(): void {
    this.logger.info(`Application version: ${VERSION.hash}`, VERSION);
  }

  private printEnvironment(): void {
    this.logger.info(`Application environment: ${EnvironmentService.get()}`);
  }
}
