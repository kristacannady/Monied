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
          <div className="home-btn">
            <img alt="Monied Logo" className="Logo" src={Logo} />
            <div>
              <Link to="/">
                <h1 style={{ fontSize: "40px" }} className="title outline">
                  Monied
                </h1>
              </Link>
            </div>
          </div>
          {Auth.loggedIn() ? (
            <div>
              <Link className="outline" to="/dashboard">
                Dashboard
              </Link>
              <Link className="outline" to="/my-projects">
                My Projects
              </Link>
              <Link className="outline" to="/my-donations">
                My Donations
              </Link>
              <Link className="outline" to="/favorites">
                Favorite
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
