import { connect } from 'react-redux';
import { reserveTable, removeReservation } from './actions';
import Table from './table';

function mapStateToProps(state) {
  return { table: state.tables[0] };
}

function mapDispatchToProps(dispatch) {
  return {
    onReserveTable: (tableId) => dispatch(reserveTable(tableId)),
    onRemoveReservation: (reservation) => dispatch(removeReservation(reservation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
