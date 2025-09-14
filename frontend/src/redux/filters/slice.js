import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: '',
  sort: 'nickname_asc',
  page: 1,
  perPage: 5,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.limit = action.payload;
    },
    resetFilters() {
      return initialState;
    }
  },
});

export const {
  setSearch,
  setSort,
  setPage,
  setPerPage,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
