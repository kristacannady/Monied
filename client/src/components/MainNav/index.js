import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Monied-1 (1).png";
import { BiLogIn } from "react-icons/bi"; 
import {GoPerson} from "react-icons/go";

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
              <Link to="/login" className="nav-link-style"><span id="login"><BiLogIn size={25} color="black" className="main-nav-icon"/></span>Login</Link>
              <Link to="/register" className="nav-link-style"><span id="signup"><GoPerson size={25} color="black" className="main-nav-icon"/></span>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
    ;
}

export default MainNav;
