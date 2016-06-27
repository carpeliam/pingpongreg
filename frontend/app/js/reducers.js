import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { RECEIVE_TABLES, ENQUEUE_FOR_TABLE } from './actions';

export function tables(state = [], action) {
  switch (action.type) {
    case RECEIVE_TABLES:
      return action.tables;
    case ENQUEUE_FOR_TABLE: {
      const list = Immutable.fromJS(state);
      return list.update(
        list.findIndex(table => table.id === action.player.table_id),
        table => table.updateIn(['queue'], queue => queue.push(action.player))
      ).toJS();
    }
    default:
      return state;
  }
}

export default combineReducers({ tables });
