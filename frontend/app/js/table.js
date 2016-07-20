import React from 'react';
import moment from 'moment';
import fetchCurrentUser from './fetchCurrentUser';

function isReservedByCurrentUser(reservation) {
  return fetchCurrentUser() === reservation.created_by;
}

export default function Table(props) {
  const currentPlayer = props.table.reservations[0];
  const handleReserveTable = () => props.onReserveTable(props.table.id);
  const reserveButtonText = currentPlayer ? 'Enter Queue' : 'Reserve';
  let leaveTableBtn;
  let queue;

  if (currentPlayer) {
    leaveTableBtn = (
      <button
        className="leave-table"
        onClick={() => { props.onRemoveReservation(currentPlayer); }}
      >Leave</button>
    );
    queue = (
      <ol>
        {props.table.reservations.map((reservation) =>
          <li
            key={reservation.id}
            style={{ fontWeight: isReservedByCurrentUser(reservation) ? 'bold' : 'normal' }}
          >
            <time dateTime={reservation.created_at}>
              {moment(reservation.created_at).format('h:mma')}
            </time> reserved by {reservation.created_by}
          </li>
        )}
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
  table: React.PropTypes.object.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
  onRemoveReservation: React.PropTypes.func.isRequired,
};
