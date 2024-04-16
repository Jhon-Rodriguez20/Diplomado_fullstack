import {configureStore} from "@reduxjs/toolkit";
import rootReducer from './userReducer';
import pageReducer from "./pageReducer";
import uploadFileReducer from "./uploadFileReducer";

const store = configureStore({
    reducer: {
        user: rootReducer,
        page: pageReducer,
        upload: uploadFileReducer
    }
});

export { store };