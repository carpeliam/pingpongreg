import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import Container from '../app/js/container';
import * as actions from '../app/js/actions';

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
    spyOn(actions, 'reserveTable').and.returnValue('action');
    const container = shallow(<Container store={store} />);
    container.props().onReserveTable('table');
    expect(actions.reserveTable).toHaveBeenCalledWith('table');
    expect(store.dispatch).toHaveBeenCalledWith('action');
  });

  it('passes onRemoveReservation to child component', () => {
    const store = createStore(state => state, { tables: [] });
    spyOn(store, 'dispatch');
    spyOn(actions, 'removeReservation').and.returnValue('action');
    const container = shallow(<Container store={store} />);
    container.props().onRemoveReservation('reservation');
    expect(actions.removeReservation).toHaveBeenCalledWith('reservation');
    expect(store.dispatch).toHaveBeenCalledWith('action');
  });
});
