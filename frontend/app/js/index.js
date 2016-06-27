import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Container from './container';
import reducer from './reducers';

const initialState = { tables: [{ id: 1, queue: [] }] };
const store = createStore(
  reducer,
  initialState,
  compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f));

function Root() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.body.appendChild(document.createElement('div')));
