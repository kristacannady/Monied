import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assests/monied-logo.png";

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
            <img alt="Monied Logo" className="Logo" src={Logo} />
          </Link>
          {Auth.loggedIn() ? (
            <div>
              <Link className="outline" to="/my-projects">
                My Projects
              </Link>
              <Link className="outline" to="/my-donations">
                My Donations
              </Link>
              <Link className="outline" to="/favorites">
                My Favorites
              </Link>
              <Link className="outline" to="/NewProject">
                Create Project
              </Link>
              <a className="outline" href="/" onClick={logout}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login" className="nav-link-style">Login</Link>
              <Link to="/register" className="nav-link-style">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
    ;
}

export default MainNav;
