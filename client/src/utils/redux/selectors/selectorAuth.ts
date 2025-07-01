import { RootState } from "../store";

export default function authSelector(state: RootState) {
  return state.auth;
}
