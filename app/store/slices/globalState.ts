import { createSlice } from '@reduxjs/toolkit';
export interface SiteConfig {
  key: string;
  value: string;
  type: string;
  description: string;
  status: string;
}
export interface CompanyInfo {
  company_id: number;
  company_code: string;
  company_name: string;
  company_type: string;
  email: string;
  phone_no: string;
  address: string;
  status: string;
}

export interface GlobalStateProps {
  token: string;
  isEditMode: boolean;
  admission_id: number;
  loginUser: string;
  siteConfig: SiteConfig;
  companyInfo: CompanyInfo;
}
const initialState: GlobalStateProps = {
  token: '',
  isEditMode: false,
  admission_id: 0,
  loginUser: '',
  siteConfig: {
    key: '',
    value: '',
    type: '',
    description: '',
    status: ''
  },
  companyInfo: {
    company_id: 1,
    company_code: '',
    company_name: '',
    company_type: '',
    email: '',
    phone_no: '',
    address: '',
    status: ''
  }
};

const slice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
    setAdmissionId(state, action) {
      state.admission_id = action.payload;
    },
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
    setSiteConfig(state, action) {
      state.siteConfig = action.payload;
    },
     setCompanyInfo(state, action) {
      state.companyInfo = action.payload;
    }
  }
});

export default slice.reducer;
export const { setToken, setIsEditMode, setAdmissionId, setLoginUser, setSiteConfig,setCompanyInfo } = slice.actions;
