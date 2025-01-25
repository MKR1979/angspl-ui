import { combineReducers } from 'redux';

import globalStateReducer from './slices/globalState';

const reducer = combineReducers({
  globalState: globalStateReducer
});

export default reducer;
