import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser } from './actions';

export function Login(props) {
  const { fields: { name }, handleSubmit, pristine } = props;
  return (
    <div className="login-bg">
      <form className="login" onSubmit={handleSubmit}>
        <input type="text" placeholder="what should we call you?" {...name} />
        <input type="submit" value="enter" disabled={pristine} />
      </form>
    </div>
  );
}
Login.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
};

export const LoginForm = reduxForm({ form: 'contact', fields: ['name'] })(Login);

function mapDispatchToProps(dispatch) {
  return { onSubmit: (result) => dispatch(loginUser(result)) };
}

export default connect(() => ({}), mapDispatchToProps)(LoginForm);
