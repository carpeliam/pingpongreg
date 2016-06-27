import React from 'react';
import { shallow } from 'enzyme';
import Table from '../app/js/table';

describe('Table', () => {
  it('calls Reserve Table callback upon button click', () => {
    const onReserveTable = jasmine.createSpy('onReserveTable');
    const table = shallow(<Table table={{ id: 1, queue: [] }} onReserveTable={onReserveTable} />);
    const reserveButton = table.find('button').at(0);
    reserveButton.simulate('click');
    expect(onReserveTable).toHaveBeenCalledWith(1);
  });

  it('shows the reserved time if it exists', () => {
    const table = shallow(<Table table={{ id: 1, queue: [{ id: 1, created_at: '2016-06-26T20:27:22.162Z'}] }} />);
    expect(table.find('time')).toHaveText('2016-06-26T20:27:22.162Z');
  });
});
