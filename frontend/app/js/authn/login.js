import React from 'react';

export default function Login() {
  const loginBtn = <a href="/users/auth/twitter">Login via Twitter</a>;
  return <div>{loginBtn}</div>;
}

Login.propTypes = {
  onLogin: React.PropTypes.func.isRequired,
};
