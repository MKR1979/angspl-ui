import { combineReducers } from 'redux';

import globalStateReducer from './slices/globalState';
import loginStateReducer from './slices/loginState';
import siteConfigStateReducer from './slices/siteConfigState';


const reducer = combineReducers({
  globalState: globalStateReducer,
  loginState: loginStateReducer,
  siteConfigState: siteConfigStateReducer
});

export default reducer;
