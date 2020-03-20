import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, error => {
      error && setErrorMsg(error);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      {errorMsg ?
        <div className='chatErrorContainer'>
          <h2 className='chatError'>{errorMsg}</h2>
          <Link to='/'>
            <button className="goBackBtn">go back</button>
          </Link>
        </div> :
        <Fragment>
          <div className='container'>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users} />
        </Fragment>
      }
    </div>
  );
}

export default Chat;