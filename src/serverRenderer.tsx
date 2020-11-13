import qs from 'qs'; // Add this at the top of the file
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import { movieReducer } from './store/movie/reducers';
import { App } from './components/App';

const rootReducer = combineReducers({
  movie: movieReducer,
});

function renderHTML(html, preloadedState) {
  /* eslint-disable */
  return `
      <!doctype html>
      <html lang='en'>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          ${
            process.env.NODE_ENV === 'development'
              ? ''
              : '<link href="/css/main.css" rel="stylesheet" type="text/css">'
          }
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c',
            )}
          </script>
          <script src="/js/main.js"></script>
          <link rel="stylesheet" href="main.css">
        </body>
      </html>
  `;
  /* eslint-enable */
}

export default function serverRenderer() {
  return (req, res) => {
    const params = qs.parse(req.query);

    // Create a new Redux store instance
    const store = createStore(rootReducer, applyMiddleware(thunk));

    const preloadedState = store.getState();
    if (params.genre) {
      preloadedState.movie.genre = params.genre;
    } else {
      preloadedState.movie.genre = 'All';
    }
    preloadedState.movie.movie = null;

    const renderRoot = () => (
      <StaticRouter>
        <App store={store} />
      </StaticRouter>
    );

    renderToString(renderRoot());

    const htmlString = renderToString(renderRoot());

    res.send(renderHTML(htmlString, preloadedState));
  };
}
