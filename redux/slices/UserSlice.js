import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: true,
    },
    reducers: {
        setUserAPI: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        removeUserAPI: (state) => {
            state.user = null;
            state.isLoading = true;
        }
    },
});

export const { setUserAPI, removeUserAPI } = userSlice.actions;
export default userSlice.reducer;