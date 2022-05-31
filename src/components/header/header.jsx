import React from 'react';
import NewTaskForm from '../new-task-form';

export default function Header() {
  return (
    <header className='header'>
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  );
}
