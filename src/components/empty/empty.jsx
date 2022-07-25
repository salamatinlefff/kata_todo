import React, { memo } from 'react';

const Empty = memo(({ filter }) => (
  <p className="lack-todo">No results found by filter &lsquo;{filter}&lsquo; </p>
));

export default Empty;
