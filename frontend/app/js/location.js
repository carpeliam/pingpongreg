import React from 'react';
import Table from './table';

export default class Location extends React.Component {
  constructor() {
    super();
    this.renderTables = this.renderTables.bind(this);
    this.renderMessage = this.renderEmptyMessage.bind(this);
  }
  componentDidMount() {
    if (!this.props.tables.length) {
      this.props.fetchTables();
    }
  }
  renderTables() {
    const { onReserveTable, onRemoveReservation } = this.props;
    return this.props.tables.map((table) =>
      <Table
        key={table.id}
        table={table}
        onReserveTable={onReserveTable}
        onRemoveReservation={onRemoveReservation}
      />
    );
  }
  renderEmptyMessage() {
    return 'No tables are loaded. Did you configure any tables?';
  }
  render() {
    return <div>{this.props.tables.length ? this.renderTables() : this.renderEmptyMessage()}</div>;
  }
}

Location.propTypes = {
  tables: React.PropTypes.array.isRequired,
  fetchTables: React.PropTypes.func.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
  onRemoveReservation: React.PropTypes.func.isRequired,
};
