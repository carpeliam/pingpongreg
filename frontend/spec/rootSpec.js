import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import RootContainer, { Root } from '../app/js/root';
import Container from '../app/js/container';
import Login from '../app/js/login';
import * as subscribeToSocketEvents from '../app/js/subscribeToSocketEvents';

describe('Root', () => {
  describe('component', () => {
    const currentUser = { name: 'margaret', id: 'abc123' };
    describe('when a user is logged in', () => {
      let subscribeToSocketEventsSpy;
      let root;
      beforeEach(() => {
        subscribeToSocketEventsSpy = jasmine.createSpy('subscribeToSocketEvents');
        root = shallow(
          <Root currentUser={currentUser} subscribeToSocketEvents={subscribeToSocketEventsSpy} />
        );
      });
      it('renders the container', () => {
        expect(root.find(Container)).toBePresent();
      });
      it('subscribes the user to socket events', () => {
        root.instance().componentDidMount();
        expect(subscribeToSocketEventsSpy).toHaveBeenCalledWith('abc123');
      });
    });

    describe('when a user is not logged in', () => {
      it('renders the login', () => {
        const root = shallow(<Root currentUser={undefined} />);
        expect(root.find(Login)).toBePresent();
      });
    });
  });

  describe('container', () => {
    let store;
    let rootContainer;
    beforeEach(() => {
      store = createStore(state => state, { currentUser: { name: 'margaret', id: 'abc123' } });
      spyOn(store, 'dispatch');
      spyOn(subscribeToSocketEvents, 'default');
      rootContainer = shallow(<RootContainer store={store} />);
    });

    it('passes the user down', () => {
      expect(rootContainer).toHaveProp('currentUser', { name: 'margaret', id: 'abc123' });
    });

    it('passes subscribeToSocketEvents down', () => {
      rootContainer.props().subscribeToSocketEvents('abc123');
      expect(subscribeToSocketEvents.default).toHaveBeenCalledWith(store.dispatch, 'abc123');
    });
  });
});
