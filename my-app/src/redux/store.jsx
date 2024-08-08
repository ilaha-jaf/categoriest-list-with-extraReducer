import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlicer'
export const store=configureStore({
    reducer:{
        users: todoReducer
    }
 
})