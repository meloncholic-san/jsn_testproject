import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../index.js";

export const fetchSuperheroes = createAsyncThunk(
  "superheroes/fetchAll",
  async ({ search = "", sort = "", page = 1, perPage = 5 } = {}, thunkAPI) => {
    try {
      const response = await api.get("/api/superhero", {
        params: { search, sort, page, perPage },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSuperhero = createAsyncThunk(
  "superheroes/create",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/superhero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSuperhero = createAsyncThunk(
  "superheroes/update",
  async ({ id, update }, thunkAPI) => {
    try {
      const response = await api.patch(`/api/superhero/${id}`, update, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSuperhero = createAsyncThunk(
  "superheroes/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/api/superhero/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchSuperheroById = createAsyncThunk(
  'superheroes/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/api/superhero/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

