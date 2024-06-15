import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {

  const {curentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)


  console.log(message)
  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hey! How are you?</p>
        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div> */}
    </div>
  );
}

export default Message