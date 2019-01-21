// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';
import { VERSION } from '../../generated_modules/version/version';
import { EnvironmentService } from './core/services/environment/environment.service';
import { CallInvitationService } from './core/services/call/call-invitation.service';
import * as moment from 'moment';
import { RemoteLogoutService } from '@platform/core/services/remote-logout/remote-logout.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';

const polishTranslations = require('../../lib/angular-translations/pl-pl.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    private logger: LoggerService,
    private expertCallService: CallInvitationService,
    private remoteLogoutService: RemoteLogoutService,
    private callSessionService: CallSessionService,
    translate: TranslateService,
  ) {
    this.printVersion();
    this.printEnvironment();

    translate.setTranslation('pl', polishTranslations);
    translate.addLangs(['pl']);

    translate.setDefaultLang('pl');
    translate.use('pl');

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

  private printVersion = (): void => {
    this.logger.info(`Application version: ${VERSION.hash}`, VERSION);
  };

  private printEnvironment = (): void => {
    this.logger.info(`Application environment: ${EnvironmentService.get()}`);
  };
}
