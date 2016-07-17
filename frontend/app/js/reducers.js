import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
  RECEIVE_TABLES,
  ENQUEUE_FOR_TABLE,
  REMOVE_RESERVATION,
  UPDATE_RESERVATIONS,
} from './actions';

function listWithUpdatedTable(list, tableId, tableUpdateOperation) {
  const tableIndex = list.findIndex(table => table.get('id') === tableId);
  return list.update(tableIndex, tableUpdateOperation).toJS();
}

export function tables(state = [], action) {
  const list = Immutable.fromJS(state);
  switch (action.type) {
    case RECEIVE_TABLES:
      return action.tables;
    case ENQUEUE_FOR_TABLE: {
      return listWithUpdatedTable(list, action.player.table_id,
        table => table.updateIn(['queue'], queue => queue.push(action.player)));
    }
    case REMOVE_RESERVATION: {
      return listWithUpdatedTable(list, action.reservation.table_id,
        table => table.updateIn(['queue'],
          queue => queue.filterNot(r => r.get('id') === action.reservation.id)));
    }
    case UPDATE_RESERVATIONS: {
      return listWithUpdatedTable(list, action.tableId,
        table => table.setIn(['queue'], action.reservations));
    }
    default:
      return state;
  }
}

export default combineReducers({ tables });
