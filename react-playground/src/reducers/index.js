import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as checkBalanceReducers from './checkBalanceReducers';

const rootReducer = combineReducers({
	checkBalanceReducers,
  routing: routerReducer
});

export default rootReducer;
