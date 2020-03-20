import React, { useState } from 'react';

import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');

  const handleEmptyField = e => {
    if (!room) {
      e.preventDefault();
      return setError('Please add the room you would like to join');
    }
    if (!name) {
      e.preventDefault();
      return setError('Please add a username');
    }
    return null;
  };

  console.log(error);

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>join a chat room</h1>
        {!error && <h2 className='joinInstruction'>Please select a username and a room</h2>}
        {error && <h2 className='joinError'>{error}</h2>}
        <div className='joinInputContainer'>
          <input placeholder='Name' className='joinInput' type='text' onChange={event => setName(event.target.value)} />
        </div>
        <div className='joinInputContainer'>
          <input placeholder='Room' className='joinInput' type='text' onChange={event => setRoom(event.target.value)} />
        </div>
        <Link onClick={handleEmptyField} to={`/chat?name=${name}&room=${room}`}>
          <button className='button' type='submit'>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;