import React, { memo } from 'react';

const Header = memo(({ children }) => (
  <header className="header">
    <h1>todos</h1>
    {children}
  </header>
));

export default Header;
