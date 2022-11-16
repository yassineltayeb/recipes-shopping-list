import { User } from "../models/user.mode";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}

export function AuthReducer(state: State = initialState, action) {
  return state;
}
