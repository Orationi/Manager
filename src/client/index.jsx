import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';

import createStore          from '../createStore';
import routes               from '../routes/main';

import DevTools                from '../utils/DevTools.jsx';

global.__CLIENT__ = true;
global.__SERVER__ = false;

const history = createBrowserHistory();
const store = createStore();

const router = <Router children={routes} history={history} />;
const dest = document.getElementById('react-view');

render(
  <Provider store={store} key="provider">
    <div>
      {router}
    </div>
  </Provider>,
  dest
);


// Avoid react to throw error about different markup on client and server - don't render DevTools in first time
if (!window.devToolsExtension) {
  render(
    <Provider store={store} key="provider">
      <div>
        {router}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
