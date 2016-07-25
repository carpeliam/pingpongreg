import React from 'react';
import moment from 'moment';

function renderReservation(reservation, currentUser, removeReservation) {
  const handleRemoveReservation = () => removeReservation({
    reservationId: reservation.id,
    user: currentUser,
  });
  return (
    <li
      key={reservation.id}
      style={{ fontWeight: currentUser.id === reservation.created_by.id ? 'bold' : 'normal' }}
    >
      <span>
        <time dateTime={reservation.created_at}>
          {moment(reservation.created_at).format('h:mma')}
        </time> reserved by {reservation.created_by.name}
      </span>
      <button className="leave-table" onClick={handleRemoveReservation}>X</button>
    </li>
  );
}

export default function Table(props) {
  const currentReservation = props.table.reservations[0];
  const handleReserveTable = () => props.onReserveTable({
    tableId: props.table.id, user: props.currentUser,
  });
  const reserveButtonText = currentReservation ? 'Enter Queue' : 'Reserve';
  let queue;

  if (currentReservation) {
    queue = (
      <ol>
        {props.table.reservations.map((reservation) =>
          renderReservation(reservation, props.currentUser, props.onRemoveReservation))}
      </ol>
    );
  }
  return (
    <div>
      <button className="reserve-table" onClick={handleReserveTable}>
        {reserveButtonText}
      </button>
      {queue}
    </div>
  );
}

Table.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  table: React.PropTypes.object.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
  onRemoveReservation: React.PropTypes.func.isRequired,
};
