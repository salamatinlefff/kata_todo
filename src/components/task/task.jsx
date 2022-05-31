import React from 'react';

export default function Task({ description, timeCreated, classEditing }) {
  return (
    <>
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description'>{description}</span>
          <span className='created'>created {timeCreated} ago</span>
        </label>
        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy'></button>
      </div>
      {classEditing && (
        <input type='text' className='edit' value='Editing task' onChange={() => {}} />
      )}
    </>
  );
}
