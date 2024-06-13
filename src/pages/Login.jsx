import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setErr('Email already in use. Please login or use a different email.');
      } else {
        setErr(`Firebase error: ${err.message}`);
      }
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Cloud</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          {' '}
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <input style={{ display: 'none' }} type="file" id="file" />
          <button>Sign in</button>
          {err && <p>Something went wrong</p>}
        </form>
        <p>
          {' '}
          you don't you have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
