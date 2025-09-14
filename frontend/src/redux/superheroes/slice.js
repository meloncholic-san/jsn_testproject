import { createSlice } from "@reduxjs/toolkit";
import { fetchSuperheroes, createSuperhero, updateSuperhero, deleteSuperhero, fetchSuperheroById } from "./operations";

const initialState = {
  items: [],
  currentHero: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const superheroesSlice = createSlice({
  name: "superheroes",
  initialState,
  reducers: {
    resetSuperheroes() {
      return initialState;
    },
    setCurrentHero: (state, action) => {
      state.currentHero = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
    .addCase(fetchSuperheroes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(fetchSuperheroes.fulfilled, (state, action) => {
    const { items, ...pagination } = action.payload.data;
    state.items = items;
    state.pagination = {
        page: pagination.page,
        perPage: pagination.perPage,
        totalPages: pagination.totalPages,
        totalItems: pagination.totalItems,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPreviousPage,
    };
    state.isLoading = false;
    state.error = null;
    })
    .addCase(fetchSuperheroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
    })


    .addCase(createSuperhero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(createSuperhero.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
        state.error = null;
    })
    .addCase(createSuperhero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
    })


    .addCase(updateSuperhero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(updateSuperhero.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
        state.items[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
    })
    .addCase(updateSuperhero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
    })


    .addCase(deleteSuperhero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(deleteSuperhero.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
        state.isLoading = false;
        state.error = null;
    })
    .addCase(deleteSuperhero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
    })

    .addCase(fetchSuperheroById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchSuperheroById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentHero = action.payload;
    })
    .addCase(fetchSuperheroById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to fetch hero';
    })
});

export const { resetSuperheroes, setCurrentHero } = superheroesSlice.actions;
export default superheroesSlice.reducer;
