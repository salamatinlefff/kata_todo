import React from 'react';

const Header = (props) => {
  return (
    <header className='header'>
      <h1>todos</h1>
      {props.children}
    </header>
  );
};

export default Header;
