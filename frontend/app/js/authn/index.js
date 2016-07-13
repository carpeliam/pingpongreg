import { connect } from 'react-redux';
import { authenticate } from '../actions';
import Login from './login';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(authenticate()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
