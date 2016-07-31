import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { mount } from 'enzyme';
import Login from '../app/js/login';
import * as actions from '../app/js/actions';

describe('Login', () => {
  let login;
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(actions, 'loginUser').and.returnValue({ type: 'LOGIN_USER' });
    login = mount(<Login store={store} />);
  });

  it('calls loginUser action upon form submission', () => {
    const form = login.find('form');
    const input = login.find('input[name="name"]');
    input.simulate('change', { target: { value: 'margaret' } });
    form.simulate('submit');
    expect(actions.loginUser).toHaveBeenCalledWith({ name: 'margaret' });
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'LOGIN_USER' });
  });

  it('disables the submit button when no name is entered', () => {
    const submit = login.find('input[type="submit"]');
    expect(submit).toBeDisabled();
  });
});
