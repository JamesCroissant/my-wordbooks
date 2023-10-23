import React, { useContext, useState } from 'react';
import "./Topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Topbar () {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/main" style={{ textDecoration: "none", color: "white" }}>
          <span className="logo">{user.username}'s WORDBOOKS</span>
        </Link>
      </div>

      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon">&#9776;</label>
      
      <div className="topbarRight">
        <nav className="side-nav">
          <ul className="menuList">
            <li className="menuCategory">
              <Link to={"/main/users"} style={{ textDecoration: "none", color: "white" }}>
                <span className="menuCategoryText">profile</span>
              </Link>
            </li>
            <li className="menuCategory">
              <Link to={"/main/words"} style={{ textDecoration: "none", color: "white" }}>
                <span className="menuCategoryText">wordlist</span>
              </Link>
            </li>
            <li className="menuCategory">
              <Link to="/" style={{ textDecoration: "none", color: "white", hover : "red" }}>
              {user ? (
                <span className="menuCategoryText" onClick={logOut}>logout</span>
              ) : (
                <Link to="/login">login</Link>
              )}
              </Link>
            </li>
            <label for="menu-toggle" class="close-btn">&times;</label>
          </ul>
        </nav>
      </div>
    </div>
  );
};