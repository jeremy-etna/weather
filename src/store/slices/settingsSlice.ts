import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AvailableUnits = 'metric' | 'imperial';

interface SettingsState {
  currentUnit: AvailableUnits;
}

const initialState = {currentUnit: 'metric' } as SettingsState

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrentUnit(state, action : PayloadAction<'metric' | 'imperial'>) {
        state.currentUnit = action.payload;
    },
  },
})

export const { setCurrentUnit } = settingsSlice.actions
export default settingsSlice.reducer