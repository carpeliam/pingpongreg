import { connect } from 'react-redux';
import { reserveTable, removeReservation, fetchTables } from './actions';
import Home from './home';

function mapStateToProps({ tables, currentUser }) {
  return { tables, currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTables: () => dispatch(fetchTables()),
    onReserveTable: (tableId) => dispatch(reserveTable(tableId)),
    onRemoveReservation: (reservation) => dispatch(removeReservation(reservation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
