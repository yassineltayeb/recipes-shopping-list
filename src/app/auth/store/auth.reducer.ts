import { User } from "../models/user.mode";
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function AuthReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.id,
        action.payload.email,
        action.payload.token,
        action.payload.tokenExpirationDate
      );

      console.log('login user', user);

      return {
        ...state,
        user: user,
        authError: null,
        loading: false
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
