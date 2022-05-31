import React from 'react'

export default function NewTaskForm() {
  return (
    <input
      className='new-todo'
      placeholder='What needs to be done?'
      autoFocus={true}
    />
  );
}
