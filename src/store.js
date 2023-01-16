import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './slices/ThemeSlice'
import userReducer from './slices/UserSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    theme:themeReducer,
    user:userReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)
//creating store
export const store = configureStore({
    reducer:persistedReducer
})