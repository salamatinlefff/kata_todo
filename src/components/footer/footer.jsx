import React from 'react'

export default function Footer() {
  return (
    <footer className='footer'>
      <span className='todo-count'>1 items left</span>
      <ul className='filters'>
        <li>
          <button className='selected'>All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
      <button className='clear-completed'>Clear completed</button>
    </footer>
  );
}
