import React from 'react';
import { shallow } from 'enzyme';
import Table from '../app/js/table';

describe('Table', () => {
  it('calls Reserve Table callback upon reserve button click', () => {
    const onReserveTable = jasmine.createSpy('onReserveTable');
    const table = shallow(<Table table={{ id: 1, queue: [] }} onReserveTable={onReserveTable} />);
    const reserveButton = table.find('.reserve-table').at(0);
    reserveButton.simulate('click');
    expect(onReserveTable).toHaveBeenCalledWith(1);
  });

  it('shows the reserved time if it exists', () => {
    const table = shallow(
      <Table table={{ id: 1, queue: [{ id: 1, created_at: '2016-06-26T20:27:22.162Z' }] }} />
    );
    expect(table.find('time')).toHaveText('2016-06-26T20:27:22.162Z');
  });

  it('disables the button if the table is reserved', () => {
    const table = shallow(
      <Table table={{ id: 1, queue: [{ id: 1, created_at: '2016-06-26T20:27:22.162Z' }] }} />
    );
    const reserveButton = table.find('button').at(0);
    expect(reserveButton).toMatchSelector('[disabled=true]');
  });

  it('calls Leave Table callback upon leave button click', () => {
    const onRemoveReservation = jasmine.createSpy('onRemoveReservation');
    const table = shallow(<Table
      table={{ id: 1, queue: [{ id: 2 }] }}
      onRemoveReservation={onRemoveReservation}
    />);
    const leaveButton = table.find('.leave-table').at(0);
    leaveButton.simulate('click');
    expect(onRemoveReservation).toHaveBeenCalledWith({ id: 2 });
  });
});
