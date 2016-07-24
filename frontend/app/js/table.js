import React from 'react';
import moment from 'moment';

function renderReservation(reservation, currentUser) {
  return (
    <li
      key={reservation.id}
      style={{ fontWeight: currentUser.id === reservation.created_by.id ? 'bold' : 'normal' }}
    >
      <time dateTime={reservation.created_at}>
        {moment(reservation.created_at).format('h:mma')}
      </time> reserved by {reservation.created_by.name}
    </li>
  );
}

export default function Table(props) {
  const currentReservation = props.table.reservations[0];
  const handleReserveTable = () => props.onReserveTable({
    tableId: props.table.id, user: props.currentUser,
  });
  const handleRemoveReservation = () => props.onRemoveReservation({
    reservationId: currentReservation.id,
    user: props.currentUser,
  });
  const reserveButtonText = currentReservation ? 'Enter Queue' : 'Reserve';
  let leaveTableBtn;
  let queue;

  if (currentReservation) {
    leaveTableBtn = (
      <button className="leave-table" onClick={handleRemoveReservation}>Leave</button>
    );
    queue = (
      <ol>
        {props.table.reservations.map((reservation) =>
          renderReservation(reservation, props.currentUser))}
      </ol>
    );
  }
  return (
    <div>
      <button className="reserve-table" onClick={handleReserveTable}>
        {reserveButtonText}
      </button>
      {leaveTableBtn}
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
