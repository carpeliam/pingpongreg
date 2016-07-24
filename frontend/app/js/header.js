import React from 'react';

export default function Header(props) {
  return <div>{props.currentUser.name}</div>;
}
Header.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
};
