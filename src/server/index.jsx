import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import { Provider }              from 'react-redux';
import path                      from 'path';


import routes                    from '../routes/main.jsx';
import fetchComponentData        from './fetchComponentData';
import createStore               from '../createStore';
import fetchNotImplementedEndpoints from './fetchNotImplementedEndpoints';

// TODO: no insights in dev mode for later
const appInsights = require('applicationinsights/applicationinsights.js');
const config = require('../config.js')
appInsights.setup(config.AppInsightsInstrumentationKey).start();

global.__SERVER__ = true;
global.__CLIENT__ = false;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('../../webpack.dev').default(app);

  // Debug output: not implemented endpoints
  fetchNotImplementedEndpoints().then(ep => {
    if (ep.length) {
        console.warn('~~~ Not implemented endpoints:\r\n', ep);
    }
  });
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use( (req, res) => {
  const location = createLocation(req.url);
  const store = createStore();

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <div>
            <RoutingContext {...renderProps} />
          </div>
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Orationi.Master POC</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
