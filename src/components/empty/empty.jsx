import React from 'react';

export default function Empty({ filter }) {
  return <p className="lack-todo">No results found by filter &lsquo;{filter}&lsquo; </p>;
}
