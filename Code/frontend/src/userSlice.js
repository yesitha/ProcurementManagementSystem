// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
    },
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
