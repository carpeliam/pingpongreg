export const RESERVE_TABLE = 'RESERVE_TABLE';
export const RECEIVE_TABLES = 'RECEIVE_TABLES';
export const ENQUEUE_FOR_TABLE = 'ENQUEUE_FOR_TABLE';
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION';

function receiveTables(tables) {
  return { type: RECEIVE_TABLES, tables };
}

function enqueuePlayer(player) {
  return { type: ENQUEUE_FOR_TABLE, player };
}

export function fetchTables() {
  return dispatch =>
    fetch('/table_queues')
      .then(response => response.json())
      .then(json => dispatch(receiveTables(json)));
}

export function reserveTable(tableId) {
  console.log(window.cable);
  return dispatch =>
    fetch(`/table_queues/${tableId}/table_queue_entries`, { method: 'POST' })
      .then(response => response.json())
      .then(json => dispatch(enqueuePlayer(json)));
}

export function removeReservation(reservation) {
  return dispatch =>
    fetch(`/table_queue_entries/${reservation.id}`, { method: 'DELETE' })
      .then(() => dispatch({ type: REMOVE_RESERVATION, reservation }));
}

export function authenticate() {}
