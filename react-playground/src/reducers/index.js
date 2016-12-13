import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { checkBalance } from './checkBalanceReducers';

const rootReducer = combineReducers({
	checkBalance: checkBalance,
  routing: routerReducer
});

export default rootReducer;
