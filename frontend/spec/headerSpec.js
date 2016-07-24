import React from 'react';
import { shallow } from 'enzyme';
import Header from '../app/js/header';

describe('Header', () => {
  const currentUser = { id: 'abc123', name: 'margaret' };
  it('renders the user name', () => {
    const header = shallow(<Header currentUser={currentUser} />);
    expect(header).toHaveText('margaret');
  });
});
