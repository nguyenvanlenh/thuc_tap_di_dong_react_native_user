// CategorySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: ["Đồ Nike Nam", "Đồ Nike Nữ", "Đồ Adidas Nam", "Đồ Adidas Nữ", "Đồ Puma Nam","Đồ Puma Nữ"],
  selectedCategory: "Đồ Nike Nam",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export const categorySelector = (state) => state.category;
export default categorySlice.reducer;
