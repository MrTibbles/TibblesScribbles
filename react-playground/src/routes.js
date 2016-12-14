import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import BalanceChecker from './components/BalanceChecker';
import ProductListings from './containers/ProductListings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="get-products" component={ProductListings} />
    <Route path="balance-checker" component={BalanceChecker} />
    <Route path="*" component={HomePage} />
  </Route>
);
