import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromLogin from './login.reducer';
import * as fromSession from './session.reducer';
import * as fromNavbar from './navbar.reducer';

export interface ICoreState {
  login: fromLogin.IState;
  session: fromSession.IState;
  userType: fromNavbar.IState;
}

export interface IState extends fromRoot.IState {
  core: ICoreState;
}

// tslint:disable-next-line:no-any
export const reducers: ActionReducerMap<ICoreState, any> = {
  login: fromLogin.reducer,
  session: fromSession.reducer,
  userType: fromNavbar.reducer,
};

export const selectCoreState = createFeatureSelector<IState, ICoreState>('core');

export const selectLogin = createSelector(selectCoreState, (state: ICoreState) => state.login);
export const selectSession = createSelector(selectCoreState, (state: ICoreState) => state.session);
export const selectUserType = createSelector(selectCoreState, (state: ICoreState) => state.userType);

export const getSession = createSelector(selectSession, fromSession.getSession);
export const getLoggedIn = createSelector(selectSession, state => ({
  isLoggedIn: typeof state.session !== 'undefined',
  isFromBackend: state.isFromBackend,
  isPending: state.isPending,
}));
export const getLoginError = createSelector(selectLogin, fromLogin.getError);
export const getLoginPending = createSelector(selectLogin, fromLogin.getIsPending);
export const getUserType = createSelector(selectUserType, fromNavbar.getUserType);
export const getSessionAndUserType = createSelector(getSession, getUserType, (session, userType) => ({
  getSession: session,
  getUserType: userType,
}));
export const getIsNavbarUserMenuVisible = createSelector(selectUserType, fromNavbar.getIsNavbarUserMenuVisible);
