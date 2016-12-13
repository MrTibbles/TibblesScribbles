import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import BalanceChecker from './components/BalanceChecker';
import AssetListings from './components/AssetListings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="balance-checker" component={BalanceChecker} />
    <Route path="get-assets" component={AssetListings} />
    <Route path="*" component={HomePage} />
  </Route>
);
