import React from 'react';
import { shallow } from 'enzyme';
import Table from '../app/js/table';

describe('Table', () => {
  const currentUser = { name: 'margaret', id: 'abc123' };
  it('calls Reserve Table callback upon reserve button click', () => {
    const table = { id: 1, reservations: [] };
    const onReserveTable = jasmine.createSpy('onReserveTable');
    const tableComponent = shallow(
      <Table {...{ table, onReserveTable, currentUser }} onRemoveReservation={() => {}} />
    );
    const reserveButton = tableComponent.find('.reserve-table').first();
    reserveButton.simulate('click');
    expect(onReserveTable).toHaveBeenCalledWith({ tableId: 1, user: currentUser });
  });

  describe('when the table is reserved', () => {
    const table = { id: 1, reservations: [
      {
        id: 1,
        created_at: '2016-06-26T20:27:22.162Z',
        created_by: { name: 'Jim', id: '123abc' },
      },
      {
        id: 2,
        created_at: '2016-06-27T08:13:46.543Z',
        created_by: { name: 'margaret', id: 'abc123' },
      },
    ] };
    let tableComponent;
    let onRemoveReservation;
    beforeEach(() => {
      onRemoveReservation = jasmine.createSpy('onRemoveReservation');
      tableComponent = shallow(
        <Table {...{ table, onRemoveReservation, currentUser }} onReserveTable={() => {}} />
      );
    });
    it('changes the text of the button', () => {
      const reserveButton = tableComponent.find('.reserve-table').first();
      expect(reserveButton).toHaveText('Enter Queue');
    });
    it('styles the local user in bold text', () => {
      expect(tableComponent.find('li').at(1)).toHaveStyle('fontWeight', 'bold');
    });
    it('shows the queue', () => {
      expect(tableComponent.find('ol li').first()).toHaveText('1:27pm reserved by Jim');
    });

    it('calls Leave Table callback upon leave button click', () => {
      const leaveButton = tableComponent.find('.leave-table').first();
      leaveButton.simulate('click');
      expect(onRemoveReservation).toHaveBeenCalledWith({
        reservationId: 1,
        user: currentUser,
      });
    });
  });
});
