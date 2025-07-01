import { RootState } from "@/utils/redux/store";

const dataUser = (state: RootState) => ({
  users: state.user.users,
  total: state.user.total,
  currentPage: state.user.currentPage,
  totalPages: state.user.totalPages,
  loading: state.user.loading,
  error: state.user.error,
});

export default dataUser;
