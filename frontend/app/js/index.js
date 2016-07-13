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

import ActionCable from 'actioncable';
function dataReceivedAction(data) {
  return { type: 'RECEIVED_DATA', data };
}
window.cable = ActionCable.createConsumer();
window.cable.subscriptions.create('TableChannel', {
  connected: () => console.log('connected'),
  disconnected: (...args) => console.log('disconnected', args),
  rejected: (...args) => console.log('rejected', args),
  received: (data) => store.dispatch(dataReceivedAction(data)),
});

function Root() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.body.appendChild(document.createElement('div')));
