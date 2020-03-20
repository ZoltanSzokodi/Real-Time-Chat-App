import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
    </form>
  );
};

export default Input;