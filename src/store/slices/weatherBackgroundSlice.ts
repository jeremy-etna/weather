import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface WeatherBackgroundState {
  weather: string;
  time: string;
}

const initialState = {weather: 'sunny', time: 'day' } as WeatherBackgroundState

const weatherBackgroundSlice = createSlice({
  name: 'weatherBackground',
  initialState,
  reducers: {
    setCurrentWeather(state, action : PayloadAction<string>) {
        state.weather = action.payload;
    },
    setCurrentTime(state, action : PayloadAction<string>) {
        state.time = action.payload;
    }
  },
})

export const { setCurrentWeather, setCurrentTime } = weatherBackgroundSlice.actions
export default weatherBackgroundSlice.reducer