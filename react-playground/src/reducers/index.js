import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authenticationReducers';
import { checkBalance } from './checkBalanceReducers';
import { products } from './productListingsReducers';
import sideBarVisibilityFilter from './sideBarVisibilityFilterReducers';

const rootReducer = combineReducers({
	auth,
	sideBarVisibilityFilter,
	checkBalance,
	productListings: products,
  routing: routerReducer
});

export default rootReducer;
