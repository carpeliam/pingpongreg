import React from 'react';

function showReservedTime(currentPlayer) {
  if (currentPlayer) {
    return <time>{currentPlayer.created_at}</time>;
  }
  return undefined;
}

export default function Table(props) {
  const currentPlayer = props.table.reservations[0];
  let leaveTableBtn;
  if (currentPlayer) {
    leaveTableBtn = (
      <button
        className="leave-table"
        onClick={() => { props.onRemoveReservation(currentPlayer); }}
      >Leave</button>
    );
  }
  return (
    <div>
      <button
        className="reserve-table"
        onClick={() => { props.onReserveTable(props.table.id); }}
        disabled={props.table.reservations.length > 0}
      >Reserve</button>
      {showReservedTime(currentPlayer)}
      {leaveTableBtn}
    </div>
  );
}

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
  onRemoveReservation: React.PropTypes.func.isRequired,
};
