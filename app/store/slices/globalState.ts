import { createSlice } from '@reduxjs/toolkit';
export interface GlobalStateProps {
  token: string;
}
const initialState: GlobalStateProps = {
  token: ''
};

const slice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

export default slice.reducer;
export const { setToken } = slice.actions;
