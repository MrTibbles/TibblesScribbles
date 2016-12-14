import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import BalanceChecker from './components/BalanceChecker';
import AssetListingsContainer from './containers/AssetListingsContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="get-products" component={AssetListingsContainer} />
    <Route path="balance-checker" component={BalanceChecker} />
    <Route path="*" component={HomePage} />
  </Route>
);
