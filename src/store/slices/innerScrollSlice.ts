import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ScrollState {
  innerScrollEnabled: boolean
}

const initialState = {innerScrollEnabled: true } as ScrollState

const innerScrollSlice = createSlice({
  name: 'innerScroll',
  initialState,
  reducers: {
    setInnerScrollEnabled(state) {
        state.innerScrollEnabled = true;
    },
    setInnerScrollDisabled(state) {
        state.innerScrollEnabled = false;
    },
  },
})

export const { setInnerScrollEnabled, setInnerScrollDisabled } = innerScrollSlice.actions
export default innerScrollSlice.reducer