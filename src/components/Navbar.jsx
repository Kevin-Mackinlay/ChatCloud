import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">ChatCloud</span>
      {currentUser ? (
        <div className="user">
          <img src={currentUser.photoURL} alt={currentUser.displayName} />
          <span>{currentUser.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="user">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Navbar