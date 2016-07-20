import React from 'react';
import { shallow } from 'enzyme';
import * as fetchCurrentUser from '../app/js/fetchCurrentUser';
import Table from '../app/js/table';

describe('Table', () => {
  it('calls Reserve Table callback upon reserve button click', () => {
    const onReserveTable = jasmine.createSpy('onReserveTable');
    const table = shallow(
      <Table table={{ id: 1, reservations: [] }} onReserveTable={onReserveTable} />
    );
    const reserveButton = table.find('.reserve-table').first();
    reserveButton.simulate('click');
    expect(onReserveTable).toHaveBeenCalledWith(1);
  });

  describe('when the table is reserved', () => {
    let table;
    beforeEach(() => {
      spyOn(fetchCurrentUser, 'default').and.returnValue('Meg');
      table = shallow(
        <Table
          table={{
            id: 1,
            reservations: [
              { id: 1, created_at: '2016-06-26T20:27:22.162Z', created_by: 'Jim' },
              { id: 2, created_at: '2016-06-27T08:13:46.543Z', created_by: 'Meg' },
            ],
          }}
          onReserveTable={() => {}}
        />
      );
    });
    it('changes the text of the button', () => {
      const reserveButton = table.find('.reserve-table').first();
      expect(reserveButton).toHaveText('Enter Queue');
    });
    it('styles the local user in bold text', () => {
      expect(table.find('li').at(1)).toHaveStyle('fontWeight', 'bold');
    });
    it('shows the queue', () => {
      expect(table.find('ol li').first()).toHaveText('1:27pm reserved by Jim');
    });
  });


  it('calls Leave Table callback upon leave button click', () => {
    const onRemoveReservation = jasmine.createSpy('onRemoveReservation');
    const table = shallow(<Table
      table={{ id: 1, reservations: [{ id: 2 }] }}
      onReserveTable={() => {}}
      onRemoveReservation={onRemoveReservation}
    />);
    const leaveButton = table.find('.leave-table').first();
    leaveButton.simulate('click');
    expect(onRemoveReservation).toHaveBeenCalledWith({ id: 2 });
  });
});
