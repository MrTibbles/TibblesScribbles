import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import App from './containers/App';
import HomePage from './containers/HomePage';
import ProductListings from './containers/ProductListings';
import BalanceChecker from './components/BalanceChecker';

export default (
  <Route path="/" component={HomePage}>
    <IndexRoute component={HomePage}/>
    <Route path="get-products" component={ProductListings} />
    <Route path="balance-checker" component={BalanceChecker} />
    <Route path="*" component={HomePage} />
  </Route>
);
