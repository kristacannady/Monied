import React from "react";
import { Link } from "react-router-dom";

import { CurrentUserContextProvider } from "../../context";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    CurrentUserContextProvider.logoutUser();
  };

  return (
    <header>
      <div>
        <nav>
          <Link to="/">
            <h1 className="title">Monied</h1>
          </Link>
          {CurrentUserContextProvider.isLoggedIn ? (
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
