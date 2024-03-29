import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`)
  };
 
  return (
    <>
      <button onClick={openMenu} id="Profile-btn">
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle fa-2x" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName} {user.lastName}</li>          
          <li>{user.email}</li>
          <li className="profile-dropdown-spots">
            <Link to={`/users/${user.id}/spots`}>Manage Listings</Link>
          </li>
          <li className="profile-dropdown-reviews">
            <Link to={`/users/${user.id}/reviews`}>Manage Reviews</Link>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;