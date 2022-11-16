import { User } from "../models/user.mode";
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
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

      return {
        ...state,
        user: user
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
