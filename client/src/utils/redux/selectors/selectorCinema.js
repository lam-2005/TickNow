export const cinemaDataSelector = (state) => state.cinemaCrud.data?.data?.cinema;
export const cinemaTotalSelector = (state) => state.cinemaCrud.data?.data?.pagination?.total || 0;
export const cinemaStatusSelector = (state) => state.cinemaCrud.status;
export const cinemaErrorSelector = (state) => state.cinemaCrud.error;