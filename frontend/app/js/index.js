import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Container from './container';
import reducer from './reducers';
import subscribeToSocketEvents from './subscribeToSocketEvents';

const initialState = { tables: [] };
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

subscribeToSocketEvents(store.dispatch);

function Root() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.body.appendChild(document.createElement('div')));
