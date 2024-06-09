import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchFForm">
        <input type='text' placeholder='Find a user'/>
      </div>
      <div className="userChat">
        <img src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' alt=''/>
        <div className="userChatInfo">
          <span>Sandra</span>
        </div>
      </div>
    </div>
  )
}

export default Search