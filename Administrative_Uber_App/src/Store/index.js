import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../Slices/index';

export const store = configureStore({
    reducer:{
        nav: navReducer,
    }
});