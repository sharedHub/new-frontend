// rootReducer.js
import { combineReducers } from 'redux';
import { tabledataReducer, accountdataReducer } from '../redux/reducers';

const rootReducer = combineReducers({
  tabledata: tabledataReducer,
  accountdata: accountdataReducer,
});

export default rootReducer;
