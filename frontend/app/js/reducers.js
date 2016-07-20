import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { RECEIVE_TABLES, UPDATE_RESERVATIONS } from './actions';

export function tables(state = [], action) {
  const list = Immutable.fromJS(state);
  switch (action.type) {
    case RECEIVE_TABLES:
      return action.tables;
    case UPDATE_RESERVATIONS: {
      const tableIndex = list.findIndex(table => table.get('id') === action.tableId);
      return list.update(
        tableIndex, table => table.setIn(['reservations'], action.reservations)
      ).toJS();
    }
    default:
      return state;
  }
}

export default combineReducers({ tables });
