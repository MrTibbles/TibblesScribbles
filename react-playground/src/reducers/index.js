import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authenticationReducers';
import { checkBalance } from './checkBalanceReducers';
import { products } from './productListingsReducers';

const rootReducer = combineReducers({
	auth,
	checkBalance,
	productListings: products,
  routing: routerReducer
});

export default rootReducer;
