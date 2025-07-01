export const locationDataSelector = (state) => state.locationCrud.data?.data?.location;
export const locationTotalSelector = (state) => state.locationCrud.data?.data?.pagination?.total || 0;
export const locationStatusSelector = (state) => state.locationCrud.status;
export const locationErrorSelector = (state) => state.locationCrud.error;