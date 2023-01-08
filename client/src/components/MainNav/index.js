import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <h1 className="title">Monied</h1>
          </Link>
          {Auth.loggedIn() ? (
            <div>
              <Link to="/my-projects">My Projects</Link>
              <Link to="/my-donations">My Donations</Link>
              <Link to="/favorites">Favorite</Link>
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
