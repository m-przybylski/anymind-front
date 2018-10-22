import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { AuthActions } from '@platform/core/actions';
import { SessionService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';

@Injectable()
export class LoginEffects extends Logger {
  @Effect()
  public login$ = this.actions$.pipe(
    ofType<AuthActions.LoginAction>(AuthActions.AuthActionTypes.Login),
    map(action => action.payload),
    switchMap(loginCredentials =>
      this.sessionService.login(loginCredentials).pipe(
        map(session => new AuthActions.LoginSuccessAction(session)),
        catchError(error => of(new AuthActions.LoginErrorAction(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  public loginRedirect$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LoginRedirect),
    tap(() => {
      this.loggerService.debug('Redirecting to login page');
      this.router
        .navigate(['/login'])
        .then(success => {
          if (success) {
            this.loggerService.debug('Redirecting to login page success');
          } else {
            this.loggerService.warn('Redirecting to login page failed');
          }
        })
        .catch(() => {
          this.loggerService.error('Something went wrong, redirecting to "/login"');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        });
    }),
  );

  @Effect()
  public logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    // TODO
    // When Logout will be dispatched, add unregistering from push notifications here!
    switchMap(() =>
      this.sessionService.logoutCurrentRoute().pipe(
        map(() => new AuthActions.LogoutSuccessAction()),
        catchError(error => of(new AuthActions.LogoutErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LogoutSuccess),
    tap(this.alertService.closeAllAlerts),
    switchMap(() => of(new AuthActions.LoginRedirectAction())),
  );

  @Effect({ dispatch: false })
  public dashboardRedirect$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.DashboardRedirect),
    tap(() => {
      this.loggerService.debug('Redirecting to dashboard');
      this.router
        .navigate(['/dashboard/expert/activities'])
        .then(success => {
          if (success) {
            this.loggerService.debug('Redirecting to dashboard success');
          } else {
            this.loggerService.warn('Redirecting to dashboard failed');
          }
        })
        .catch(() => {
          this.loggerService.error('Something went wrong, redirecting to "/dashboard/expert/activities"');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        });
    }),
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionService,
    private router: Router,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }
}
