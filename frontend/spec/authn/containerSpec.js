import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import Authentication from '../../app/js/authn';
import * as actions from '../../app/js/actions';

describe('Authentication Container', () => {
  it('passes onLogin to child component', () => {
    const initialState = {};
    const store = createStore(state => state, initialState);
    spyOn(store, 'dispatch');
    spyOn(actions, 'authenticate').and.returnValue('action');
    const container = shallow(<Authentication store={store} />);
    container.props().onLogin();
    expect(actions.authenticate).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('action');
  });
});
