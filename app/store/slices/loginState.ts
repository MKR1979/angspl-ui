import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  token: string;
  code: string;
  affiliate_id: number;
  loginUser_id: number;
  loginUser: string;
  admission_id: number;
}

const initialState: LoginState = {
  token: '',
  code: '',
  affiliate_id: 0,
  loginUser_id: 0,
  loginUser: '',  
  admission_id: 0
};

const loginState = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setAffiliateId: (state, action) => {
      state.affiliate_id = action.payload;
    },
    setLoginUserId: (state, action) => {
      state.loginUser_id = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    setAdmissionId: (state, action) => {
      state.admission_id = action.payload;
    },
  }
});

export const {
  setToken,
  setCode,
  setAffiliateId,
  setLoginUserId,
  setLoginUser,
  setAdmissionId,
} = loginState.actions;

export default loginState.reducer;