import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { City, getSavedData, saveCurrentIndex, addCityToSavedList, removeCityFromSavedList } from '../storage';

type CitiesLoadState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CitiesStoreState = {
    cities: City[];
    state: CitiesLoadState;
    error: string | null;
    currentIndex: number;
}

const name = 'cities';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers, reducers: {} });


export const citiesActions = { ...slice.actions, ...extraActions };
export const citiesReducer = slice.reducer;

function createInitialState() {
    return {
        cities: [] as City[],
        state: 'idle' as CitiesLoadState,
        error: null as string | null,
        currentIndex: 0
    }
}

function createExtraActions() {
    return {
        initialize: initializeFromStorage(),
        setCurrentIndex: setCurrentIndex(),
        addCity: addCity(),
        removeCity: removeCity()
    };    

    function initializeFromStorage() {
        return createAsyncThunk(
            `${name}/initializeFromStorage`,
            async () => {
                return await getSavedData();
            }
        );
    }

    function setCurrentIndex() {
        return createAsyncThunk(
            `${name}/setCurrentIndex`,
            async (index: number) => {
                saveCurrentIndex(index);
                return index;
            }
        );
    }

    function addCity() {
        return createAsyncThunk(
            `${name}/addCity`,
            async (city: City) => {
                addCityToSavedList(city);
                return city;
            }
        );
    }

    function removeCity() {
        return createAsyncThunk(
            `${name}/removeCity`,
            async (city: City) => {
                removeCityFromSavedList(city);
                return city;
            }
        );
    }
}

function createExtraReducers() {
    return (builder: ActionReducerMapBuilder<CitiesStoreState>) => {
        initializeFromStorage();
        setCurrentIndex();
        addCity();
        removeCity();

        function initializeFromStorage() {
            var { pending, fulfilled, rejected } = extraActions.initialize;
            builder.addCase(pending, (state: CitiesStoreState) => {
                state.state = 'loading';
            });
            builder.addCase(fulfilled, (state: CitiesStoreState, action: any) => {
                state.cities = action.payload.cities;
                state.currentIndex = action.payload.config.currentIndex;
                state.state = 'succeeded';
            });
            builder.addCase(rejected, (state: CitiesStoreState, action:any) => {
                state.error = action.error;
            });
        };

        function setCurrentIndex() {
            var { pending, fulfilled, rejected } = extraActions.setCurrentIndex;
            builder.addCase(pending, (state: CitiesStoreState) => {
            });
            builder.addCase(fulfilled, (state: CitiesStoreState, action: any) => {
                state.currentIndex = action.payload;
            });
            builder.addCase(rejected, (state: CitiesStoreState, action: any) => {
            });
        }

        function addCity() {
            var { pending, fulfilled, rejected } = extraActions.addCity;
            builder.addCase(pending, (state: CitiesStoreState) => {
            });
            builder.addCase(fulfilled, (state: CitiesStoreState, action: any) => {
                if(state.cities.filter(c => c.name === action.payload.name
                    && c.country === action.payload.country
                    && c.state === action.payload.state
                    && c.lat === action.payload.lat
                    && c.lon === action.payload.lon
                    ).length > 0)
                    return;

                state.cities.push(action.payload);
            });
            builder.addCase(rejected, (state: CitiesStoreState, action: any) => {
            });
        }

        function removeCity() {
            var { pending, fulfilled, rejected } = extraActions.removeCity;
            builder.addCase(pending, (state: CitiesStoreState) => {
            });
            builder.addCase(fulfilled, (state: CitiesStoreState, action: any) => {
                state.cities = state.cities.filter(c => c.name !== action.payload.name
                    || c.country !== action.payload.country
                    || c.state !== action.payload.state
                    || c.lat !== action.payload.lat
                    || c.lon !== action.payload.lon
                    );
            });
            builder.addCase(rejected, (state: CitiesStoreState, action: any) => {
            });
        }
    }
}
