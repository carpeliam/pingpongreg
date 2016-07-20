import React from 'react';
import { shallow } from 'enzyme';
import Location from '../app/js/location';
import Table from '../app/js/table';

describe('Location', () => {
  let fetchTablesSpy;
  let location;
  beforeEach(() => {
    fetchTablesSpy = jasmine.createSpy('fetchTables');
  });

  describe('with no tables present', () => {
    beforeEach(() => {
      location = shallow(<Location fetchTables={fetchTablesSpy} tables={[]} />);
    });

    it('fetches tables within componentDidMount', () => {
      location.instance().componentDidMount();
      expect(fetchTablesSpy).toHaveBeenCalled();
    });

    it('displays a message that no tables are loaded', () => {
      expect(location).toHaveText('No tables are loaded. Did you configure any tables?');
    });
  });

  describe('with tables present', () => {
    const onReserveTable = () => {};
    const onRemoveReservation = () => {};
    beforeEach(() => {
      const tables = [{ id: 1, reservations: [] }, { id: 2, reservations: [] }];
      location = shallow(<Location
        fetchTables={fetchTablesSpy}
        tables={tables}
        onReserveTable={onReserveTable}
        onRemoveReservation={onRemoveReservation}
      />);
    });
    it('does not fetch tables within componentDidMount', () => {
      location.instance().componentDidMount();
      expect(fetchTablesSpy).not.toHaveBeenCalled();
    });

    it('renders a table for each table prop', () => {
      expect(location.find(Table).length).toEqual(2);
      expect(location).toContainReact(<Table
        key={1}
        table={{ id: 1, reservations: [] }}
        onReserveTable={onReserveTable}
        onRemoveReservation={onRemoveReservation}
      />);
      expect(location).toContainReact(<Table
        key={2}
        table={{ id: 2, reservations: [] }}
        onReserveTable={onReserveTable}
        onRemoveReservation={onRemoveReservation}
      />);
    });
  });
});
