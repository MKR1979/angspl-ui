import { createSlice } from '@reduxjs/toolkit';

export interface CompanyInfo {
  company_id: number;
  domain_name: string;
  company_code: string;
  company_name: string;
  company_type: string;
  company_email: string;
  company_phone_no: string;
  company_address: string;
  logo_url: string;
  logo_height: number;
  logo_width: number;
  status: string;
  role_id: number;
}

interface GlobalState {
  companyInfo: CompanyInfo;
  saving: boolean;
  enrolledUserId:number;
}

const initialState: GlobalState = {
  companyInfo: {
    company_id: 2,
    domain_name: '',
    company_code: '',
    company_name: '',
    company_type: '',
    company_email: '',
    company_phone_no: '',
    company_address: '',
    logo_url: '/logo.png',
    logo_height: 0,
    logo_width: 0,
    status: '',
    role_id: 0
  },
  saving: false,
  enrolledUserId:0,
};

const globalState = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
    setEnrolledUserId: (state, action) => {
      state.enrolledUserId = action.payload;
    },
  }
});

export const {
  setCompanyInfo,
  setSaving,
  setEnrolledUserId,
} = globalState.actions;

export default globalState.reducer;
