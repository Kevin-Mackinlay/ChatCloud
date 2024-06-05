import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">ChatCloud</span>
      <div className='user '>
        <img src="" alt="" />
        <span>Brian</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar