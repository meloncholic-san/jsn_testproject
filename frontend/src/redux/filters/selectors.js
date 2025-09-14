export const selectFilters = (state) => state.filters;

export const selectSearch = (state) => state.filters.search;
export const selectStatus = (state) => state.filters.status;
export const selectSort = (state) => state.filters.sort;
export const selectPage = (state) => state.filters.page;
export const selectLimit = (state) => state.filters.limit;