import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message])
    });
  }, [messages]);

  // helper function for sending messages
  const sendMessage = event => {
    event.preventDefault();

    socket.emit('sendMessage', message, () => {
      setMessage('');
    });
  };

  // Event handlers

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleSendMsg = event => {
    return event.key === 'Enter' ? sendMessage(event) : null;
  };

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        {/* <input
          value={message}
          onChange={handleChange}
          onKeyPress={handleSendMsg}
        /> */}
      </div>
    </div>
  );
};

export default Chat;