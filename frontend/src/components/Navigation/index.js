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
        <div className="login btn">

        <LoginFormModal />
        </div>
        <div className="signup btn">

        <SignupFormModal />
        </div>
      </>
    );
  }

  return (
    <nav>
      <div className="navbar-container">

        <div className="navbar-left">
          <NavLink exact to="/">
            <img src='https://a0.muscache.com/pictures/52c8d856-33d0-445a-a040-a162374de100.jpg' alt='logo' id='logo'/>
            <div className='logo-words'>Pairbnb</div>
          </NavLink>
        </div>

        <div className="navbar-right">
          {/* <NavLink exact to="/">Home</NavLink> */}
          <span>
            {isLoaded && sessionLinks}
          </span>
        </div>
      </div>
    </nav>
    
  );
}

export default Navigation;