import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { checkBalance } from './checkBalanceReducers';
import { productsByCreatorId } from './productListingsReducers';

const rootReducer = combineReducers({
	checkBalance,
	products: productsByCreatorId,
  routing: routerReducer
});

export default rootReducer;
