import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/monied-logo.png";

import Auth from "../../context/auth";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <nav>
          <div className="home-btn">
            <img className="Logo" src={Logo} />
            <div>
              <Link to="/">
                <h1 className="title">Monied</h1>
              </Link>
            </div>
          </div>
          {Auth.loggedIn() ? (
            <div>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/my-donations">My Donations</Link>
              <Link to="/favorites">Favorite</Link>
              <Link to="/NewProject">Create Project</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default MainNav;
