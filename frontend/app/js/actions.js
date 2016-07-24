import shortid from 'shortid';
import subscribeToSocketEvents from './subscribeToSocketEvents';
import { setUser } from './cookieMonster';

export const RESERVE_TABLE = 'RESERVE_TABLE';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const UPDATE_RESERVATIONS = 'UPDATE_RESERVATIONS';
export const LOGIN_USER = 'LOGIN_USER';

function headersFor(user) {
  return new Headers({ UserId: JSON.stringify(user) });
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

export function reserveTable({ tableId, user }) {
  return () =>
    fetch(`/tables/${tableId}/reservations`, { method: 'POST', headers: headersFor(user) });
}

export function removeReservation({ reservationId, user }) {
  return () =>
    fetch(`/reservations/${reservationId}`, { method: 'DELETE', headers: headersFor(user) });
}

export function loginUser({ name }) {
  const id = shortid.generate();
  return dispatch => {
    const user = { id, name };
    setUser(user);
    subscribeToSocketEvents(dispatch, id);
    dispatch({ type: LOGIN_USER, user });
  };
}
