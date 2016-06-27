import React from 'react';

function showReservedTime(currentPlayer) {
  if (currentPlayer) {
    return <time>{currentPlayer.created_at}</time>;
  }
}

export default function Table(props) {
  return (
    <div>
      <button onClick={() => { props.onReserveTable(props.table.id); }} disabled={props.table.queue.length > 0}>Reserve</button>
      {showReservedTime(props.table.queue[0])}
    </div>
  );
}

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
};
