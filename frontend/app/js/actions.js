import fetchCurrentUser from './fetchCurrentUser';

export const RESERVE_TABLE = 'RESERVE_TABLE';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const UPDATE_RESERVATIONS = 'UPDATE_RESERVATIONS';

function headers() {
  return new Headers({ UserId: fetchCurrentUser() });
}

function receiveTables(tables) {
  return { type: RECEIVE_TABLES, tables };
}

export function updateReservations(tableId, reservations) {
  return { type: UPDATE_RESERVATIONS, tableId, reservations };
}

export function fetchTables() {
  return dispatch =>
    fetch('/tables')
      .then(response => response.json())
      .then(json => dispatch(receiveTables(json)));
}

export function reserveTable(tableId) {
  return () =>
    fetch(`/tables/${tableId}/reservations`, { method: 'POST', headers: headers() });
}

export function removeReservation(reservation) {
  return () =>
    fetch(`/reservations/${reservation.id}`, { method: 'DELETE', headers: headers() });
}
