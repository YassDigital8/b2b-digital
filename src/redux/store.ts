// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import posReducer from './slices/posSlice';

// combine all reducers
const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    pos: posReducer,
});

// redux-persist config
const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['auth'], // persist only auth slice (you can add more if needed)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store with middleware support for redux-persist
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
