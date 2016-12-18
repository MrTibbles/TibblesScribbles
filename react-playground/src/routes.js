import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './containers/HomePage';
import BalanceChecker from './components/BalanceChecker';

export default (
  <Route path="/" component={HomePage}>
    <IndexRoute component={HomePage}/>
    <Route path="balance-checker" component={BalanceChecker} />
    <Route path="*" component={HomePage} />
  </Route>
);
