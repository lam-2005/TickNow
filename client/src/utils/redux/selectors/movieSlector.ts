import { RootState } from "@/utils/redux/store";

const dataMovie = (state: RootState) => ({
  movies: state.movie.movies,
  total: state.movie.total,
  currentPage: state.movie.currentPage,
  totalPages: state.movie.totalPages,
  loading: state.movie.loading,
  error: state.movie.error,
});

export default dataMovie;
