import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './components/App';
import { combineReducers, applyMiddleware } from 'redux';
import { movieReducer } from './store/movie/reducers';
import { createStore } from 'redux';

const rootReducer = combineReducers({
  movie: movieReducer,
});

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
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
              '\\u003c'
            )}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    // Create a new Redux store instance
    const store = createStore(rootReducer);
    const context = {};

    const renderRoot = () => (
      <StaticRouter>
        <App store={store} />
      </StaticRouter>
    );

    renderToString(renderRoot());

    const htmlString = renderToString(renderRoot());
    const preloadedState = store.getState();

    res.send(renderHTML(htmlString, preloadedState));
  };
}
