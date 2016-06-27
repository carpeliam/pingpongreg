import { connect } from 'react-redux';
import { reserveTable } from './actions';
import Table from './table';

function mapStateToProps(state) {
  return { table: state.tables[0] };
}

function mapDispatchToProps(dispatch) {
  return { onReserveTable: (tableId) => dispatch(reserveTable(tableId)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
