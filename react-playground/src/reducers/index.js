import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { checkBalance } from './checkBalanceReducers';
import { products } from './productListingsReducers';

const rootReducer = combineReducers({
	checkBalance,
	productListings: products,
  routing: routerReducer
});

export default rootReducer;
