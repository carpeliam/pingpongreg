import React from 'react';
import { connect } from 'react-redux';
import Container from './container';
import Login from './login';
import subscribeToSocketEvents from './subscribeToSocketEvents';

export class Root extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.subscribeToSocketEvents(this.props.currentUser.id);
    }
  }
  render() {
    return (this.props.currentUser) ? <Container /> : <Login />;
  }
}

Root.propTypes = {
  currentUser: React.PropTypes.object,
  subscribeToSocketEvents: React.PropTypes.func.isRequired,
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeToSocketEvents: (id) => subscribeToSocketEvents(dispatch, id),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
