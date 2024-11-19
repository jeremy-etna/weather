import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch  } from 'react-redux';
import { citiesReducer } from './slices/citiesSlice';
import { weatherApi } from './slices/weatherMapApiSlice';
import innnerScrollReducer from './slices/innerScrollSlice';
import settingsReducer from './slices/settingsSlice';
import weatherBackgroundSlice from './slices/weatherBackgroundSlice';

export * from './slices/citiesSlice';
export * from './slices/weatherMapApiSlice';
export * from './slices/innerScrollSlice';
export * from './slices/settingsSlice';
export * from './slices/weatherBackgroundSlice';

export const store = configureStore({
    reducer: {
        cities: citiesReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
        innerScroll: innnerScrollReducer,
        settings: settingsReducer,
        weatherBackground: weatherBackgroundSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch)

export type StoreDispatch = typeof store.dispatch;
export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export type AppState = ReturnType<typeof store.getState>;