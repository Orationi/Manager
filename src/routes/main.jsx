import React                   from 'react';
import { Route, IndexRoute }   from 'react-router';
import App                     from './main/index';
import Home                    from './main/Home';

export default (
  <Route component={App} path="/">
      <IndexRoute component={Home}/>
  </Route>
);
