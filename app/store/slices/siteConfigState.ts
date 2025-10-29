import { createSlice } from '@reduxjs/toolkit';

export interface SiteConfig {
  key: string;
  value: string;
  type: string;
  description: string;
  status: string;
}


export interface pricingConfig {
  key: string;
  value: string;
  type: string;
  description: string;
  status: string;
}


export interface UserPermission {
  option_id: number;
  option_code: number;
  option_name: string;
  module_id: number;
  module_name: string;
  grant: boolean;
  permission_source: string;
}

interface SiteConfigState {
  siteConfig: SiteConfig[];
  newCompanyConfig: SiteConfig[];
  userPermission: UserPermission[];
  isEditMode: boolean;
  showQuiz: boolean;
}

const initialState: SiteConfigState = {
  siteConfig: [
    {
      key: '',
      value: '',
      type: '',
      description: '',
      status: ''
    }
  ],
   newCompanyConfig: [
    {
      key: '',
      value: '',
      type: '',
      description: '',
      status: ''
    }
  ],
  userPermission: [
    {
      option_id: 0,
      option_code: 0,
      option_name: '',
      module_id: 0,
      module_name: '',
      grant: false,
      permission_source: ''
    }
  ],
  isEditMode: false,
  showQuiz: false
};

const siteConfigState = createSlice({
  name: 'siteConfigState',
  initialState,
  reducers: {
    setSiteConfig: (state, action) => {
      state.siteConfig = action.payload;
    },
     setNewCompanyConfig: (state, action) => {
      state.newCompanyConfig = action.payload;
    },
    setUserPermission: (state, action) => {
      state.userPermission = action.payload;
    },
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setShowQuiz: (state, action) => {
      state.showQuiz = action.payload;
    }
  }
});

export const {
  setSiteConfig,
  setNewCompanyConfig,
  setUserPermission,
  setIsEditMode,
  setShowQuiz
} = siteConfigState.actions;

export default siteConfigState.reducer;
