import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
       
        if (data && data.message) setErrors(Object.values(data));
      });
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <ul id='error-message'>
        {/* {errors.map((error, idx) => { */}
         { errors.length > 0 &&<li >{errors[0]}</li>
        }
      </ul>
      <label id='lable-email'>
        Email
        <div></div>
        <input id='input-text'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Email'
          required
        />
      </label>
      <label id='lable-email'>
        Password
        <div></div>
        <input id='input-password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button onClick={demoUser}>Demo User</button>
    </form>
  );
}

export default LoginForm;