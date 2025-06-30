export interface ReduxInitStateDefaultType {
  loading: boolean;
  error: null | string;
}
const reduxInitStateDefault: ReduxInitStateDefaultType = {
  loading: false,
  error: null,
};
export default reduxInitStateDefault;
