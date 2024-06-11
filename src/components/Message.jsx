import React from 'react'

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hey! How are you?</p>
        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
    </div>
  );
}

export default Message