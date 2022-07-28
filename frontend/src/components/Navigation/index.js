import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav>
      <div className="navbar-container">

        <div className="navbar-left">
          <NavLink exact to="/">
            <img src='https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg' alt='logo' />
            <span className='logo-words'>Pairbnb</span>
          </NavLink>
        </div>

        <div className="navbar-right">
          <NavLink exact to="/">Home</NavLink>
          <span>
            {isLoaded && sessionLinks}
          </span>
        </div>
      </div>
    </nav>
    
  );
}

export default Navigation;