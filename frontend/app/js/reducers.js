import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { RECEIVE_TABLES, ENQUEUE_FOR_TABLE, REMOVE_RESERVATION } from './actions';

export function tables(state = [], action) {
  const list = Immutable.fromJS(state);
  switch (action.type) {
    case RECEIVE_TABLES:
      return action.tables;
    case ENQUEUE_FOR_TABLE: {
      return list.update(
        list.findIndex(table => table.id === action.player.table_queue_id),
        table => table.updateIn(['queue'], queue => queue.push(action.player))
      ).toJS();
    }
    case REMOVE_RESERVATION: {
      return list.update(
        list.findIndex(table => table.id === action.reservation.table_queue_id),
        table => table.updateIn(['queue'],
          queue => queue.filterNot(r => r.get('id') === action.reservation.id))
      ).toJS();
    }
    case 'RECEIVED_DATA': {
      console.log('received', action.data);
      return state;
    }
    default:
      return state;
  }
}

export default combineReducers({ tables });
