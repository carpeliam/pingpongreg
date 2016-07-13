import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../app/js/authn/login';

describe('Login', () => {
  describe('when not logged in', () => {
    it('displays login button', () => {
      const login = shallow(<Login />);
      const loginButton = login.find('a').at(0);
      expect(loginButton).toBeDefined();
    });
  });
});
