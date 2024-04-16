import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isNeededRefresh: false,
}

const pageReducer = createSlice({
    name: 'projectPage',
    initialState,
    reducers: {
        refresh: (state, action) => {
            state.isNeededRefresh = action.payload.isNeededRefresh
        }
    }
});

export const { refresh } = pageReducer.actions;
export default pageReducer.reducer;