import React from 'react';
import Header from './header';
import Table from './table';

export default class Home extends React.Component {
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
    const { currentUser, onReserveTable, onRemoveReservation } = this.props;
    return this.props.tables.map((table) =>
      <Table
        key={table.id}
        {...{ table, currentUser, onReserveTable, onRemoveReservation }}
      />
    );
  }
  renderEmptyMessage() {
    return <div className="tables-empty">No tables are loaded. Did you configure any tables?</div>;
  }
  render() {
    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        {this.props.tables.length ? this.renderTables() : this.renderEmptyMessage()}
      </div>
    );
  }
}

Home.propTypes = {
  tables: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  fetchTables: React.PropTypes.func.isRequired,
  onReserveTable: React.PropTypes.func.isRequired,
  onRemoveReservation: React.PropTypes.func.isRequired,
};
