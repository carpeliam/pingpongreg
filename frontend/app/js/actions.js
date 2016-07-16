import fetchCurrentUser from './fetchCurrentUser';

export const RESERVE_TABLE = 'RESERVE_TABLE';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const ENQUEUE_FOR_TABLE = 'ENQUEUE_FOR_TABLE';
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION';

function headers() {
  return new Headers({ UserId: fetchCurrentUser() });
}

function receiveTables(tables) {
  return { type: RECEIVE_TABLES, tables };
}

function enqueuePlayer(player) {
  return { type: ENQUEUE_FOR_TABLE, player };
}

export function fetchTables() {
  return dispatch =>
    fetch('/tables')
      .then(response => response.json())
      .then(json => dispatch(receiveTables(json)));
}

export function reserveTable(tableId) {
  return (dispatch) =>
    fetch(`/tables/${tableId}/reservations`, { method: 'POST', headers: headers() })
      .then(response => response.json())
      .then(json => dispatch(enqueuePlayer(json)));
}

export function removeReservation(reservation) {
  return dispatch =>
    fetch(`/reservations/${reservation.id}`, { method: 'DELETE', headers: headers() })
      .then(() => dispatch({ type: REMOVE_RESERVATION, reservation }));
}
