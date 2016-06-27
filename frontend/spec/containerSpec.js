import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import Container from '../app/js/container';

describe('Container', () => {
  it('passes table props to child component', () => {
    const initialState = { tables: [{ id: 1 }] };
    const store = createStore(state => state, initialState);
    const container = shallow(<Container store={store} />);
    expect(container).toHaveProp('table', { id: 1 });
  });

  it('passes onReserveTable to child component', () => {
    const store = createStore(state => state, { tables: [] });
    spyOn(store, 'dispatch');
    const container = shallow(<Container store={store} />);
    container.props().onReserveTable();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
