import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import Container from '../app/js/container';
import * as actions from '../app/js/actions';

describe('Container', () => {
  let container;
  let store;
  beforeEach(() => {
    store = createStore(state => state, {
      tables: [{ id: 1, reservations: [] }],
      currentUser: { name: 'margaret', id: 'abc123' },
    });
    spyOn(store, 'dispatch');
    container = shallow(<Container store={store} />);
  });

  it('contains a Home child component', () => {
    expect(container.find('Home')).toBePresent();
  });

  it('passes table and currentUser props to child component', () => {
    expect(container).toHaveProp('tables', [{ id: 1, reservations: [] }]);
    expect(container).toHaveProp('currentUser', { name: 'margaret', id: 'abc123' });
  });

  it('passes onReserveTable to child component', () => {
    spyOn(actions, 'reserveTable').and.returnValue('reserveTable');
    container.props().onReserveTable('table');
    expect(actions.reserveTable).toHaveBeenCalledWith('table');
    expect(store.dispatch).toHaveBeenCalledWith('reserveTable');
  });

  it('passes onRemoveReservation to child component', () => {
    spyOn(actions, 'removeReservation').and.returnValue('removeReservation');
    container.props().onRemoveReservation('reservation');
    expect(actions.removeReservation).toHaveBeenCalledWith('reservation');
    expect(store.dispatch).toHaveBeenCalledWith('removeReservation');
  });

  it('passes fetchTables to child component', () => {
    spyOn(actions, 'fetchTables').and.returnValue('fetchTables');
    container.props().fetchTables();
    expect(actions.fetchTables).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('fetchTables');
  });
});
