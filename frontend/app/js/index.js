import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Root from './root';
import reducer from './reducers';
import { fetchUser } from './cookieMonster';

const initialState = { tables: [], currentUser: fetchUser() };
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
