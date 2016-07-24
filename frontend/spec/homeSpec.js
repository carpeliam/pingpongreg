import React from 'react';
import { shallow } from 'enzyme';
import Home from '../app/js/home';
import Table from '../app/js/table';

describe('Home', () => {
  const currentUser = { id: 'abc123', name: 'margaret' };
  let fetchTablesSpy;
  let home;
  beforeEach(() => {
    fetchTablesSpy = jasmine.createSpy('fetchTables');
  });

  it('contains a Header', () => {
    home = shallow(<Home currentUser={currentUser} tables={[]} />);
    const header = home.find('Header');
    expect(header).toBePresent();
    expect(header).toHaveProp('currentUser', currentUser);
  });

  describe('with no tables present', () => {
    beforeEach(() => {
      home = shallow(<Home fetchTables={fetchTablesSpy} tables={[]} />);
    });

    it('fetches tables within componentDidMount', () => {
      home.instance().componentDidMount();
      expect(fetchTablesSpy).toHaveBeenCalled();
    });

    it('displays a message that no tables are loaded', () => {
      const msg = home.find('.tables-empty');
      expect(msg).toHaveText('No tables are loaded. Did you configure any tables?');
    });
  });

  describe('with tables present', () => {
    const onReserveTable = () => {};
    const onRemoveReservation = () => {};
    beforeEach(() => {
      const tables = [{ id: 1, reservations: [] }, { id: 2, reservations: [] }];
      home = shallow(<Home
        fetchTables={fetchTablesSpy}
        {...{ currentUser, tables, onReserveTable, onRemoveReservation }}
      />);
    });
    it('does not fetch tables within componentDidMount', () => {
      home.instance().componentDidMount();
      expect(fetchTablesSpy).not.toHaveBeenCalled();
    });

    it('renders a table for each table prop', () => {
      expect(home.find(Table).length).toEqual(2);
      expect(home).toContainReact(<Table
        key={1}
        table={{ id: 1, reservations: [] }}
        {...{ currentUser, onReserveTable, onRemoveReservation }}
      />);
      expect(home).toContainReact(<Table
        key={2}
        table={{ id: 2, reservations: [] }}
        {...{ currentUser, onReserveTable, onRemoveReservation }}
      />);
    });
  });
});
