import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: "",
    isproject: ""
}

const uploadFileReducer = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        upload: (state, action) => {
            state.id = action.payload.id;
            state.isproject = action.payload.isproject;
        }
    }
});

export const { upload } = uploadFileReducer.actions;
export default uploadFileReducer.reducer;