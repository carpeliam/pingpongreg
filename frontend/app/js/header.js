import React from 'react';

export default function Header(props) {
  return (
    <header>logged in as <span className="current-user">{props.currentUser.name}</span></header>
  );
}
Header.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
};
