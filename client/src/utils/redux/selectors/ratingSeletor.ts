// utils/redux/selectors/ratingSelector.ts
import { RootState } from "@/utils/redux/store";

const dataRating = (state: RootState) => ({
  ratings: state.rating.ratings,
  total: state.rating.total,
  currentPage: state.rating.currentPage,
  totalPages: state.rating.totalPages,
  loading: state.rating.loading,
  error: state.rating.error,
});

export default dataRating;
