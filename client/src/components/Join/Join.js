import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleChange = prop => event => {
    prop === 'name' && setName(event.target.value);
    prop === 'room' && setRoom(event.target.value);
  };

  const handleEmptyInput = event => {
    return (!name || !room) ? event.preventDefault() : null;
  };

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div><input placeholder='Name' className='joinInput' type='text' onChange={handleChange('name')} /></div>
        <div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={handleChange('room')} /></div>
        <Link onClick={handleEmptyInput} to={`/chat?name=${name}&room=${room}`}>
          <button className='button mt-20' type='submit'>Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
