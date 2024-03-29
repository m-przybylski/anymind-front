import { AuthActions, SessionActions } from '@platform/core/actions';

export interface IState {
  error?: any;
  isPending: boolean;
}

export const initialState: IState = {
  isPending: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: AuthActions.AuthActionsUnion | SessionActions.FetchActionsUnion,
): IState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.Logout:
    case AuthActions.AuthActionTypes.LoginFromModal:
    case AuthActions.AuthActionTypes.Login: {
      return {
        ...state,
        error: undefined,
        isPending: true,
      };
    }
    case AuthActions.AuthActionTypes.LogoutRemote:
    case AuthActions.AuthActionTypes.LoginSuccess:
    case AuthActions.AuthActionTypes.LogoutSuccess: {
      return {
        ...state,
        error: undefined,
        isPending: false,
      };
    }

    case AuthActions.AuthActionTypes.LoginError:
    case AuthActions.AuthActionTypes.LogoutError: {
      return {
        ...state,
        error: action.payload.error,
        isPending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: IState): string | undefined => state.error;
export const getIsPending = (state: IState): boolean => state.isPending;
