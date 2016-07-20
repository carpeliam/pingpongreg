import { connect } from 'react-redux';
import { reserveTable, removeReservation, fetchTables } from './actions';
import Location from './location';

function mapStateToProps(state) {
  return { tables: state.tables };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTables: () => dispatch(fetchTables()),
    onReserveTable: (tableId) => dispatch(reserveTable(tableId)),
    onRemoveReservation: (reservation) => dispatch(removeReservation(reservation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
