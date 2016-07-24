import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser } from './actions';

export function Login(props) {
  const { fields: { name }, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" {...name} />
      <input type="submit" />
    </form>
  );
}
Login.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

export const LoginForm = reduxForm({ form: 'contact', fields: ['name'] })(Login);

function mapDispatchToProps(dispatch) {
  return { onSubmit: (result) => dispatch(loginUser(result)) };
}

export default connect(() => ({}), mapDispatchToProps)(LoginForm);
