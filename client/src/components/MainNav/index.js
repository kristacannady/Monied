import React from 'react';
import {Link} from "react-router-dom";

import {CurrentUserContextProvider} from "../../context";

const MainNav = () =>{
    const logout = (event) =>{
        event.preventDefault();
        CurrentUserContextProvider.logoutUser();
    };

    return(
        <header>
            <div>
                <Link to="/">
                    <h1>Monied</h1>
                </Link>
                <nav>
                    {CurrentUserContextProvider.isLoggedIn() ? (
                        <>
                        <Link to="/dashboard">Profile</Link>
                        <a href='/' onClick={logout}>
                            Logout
                        </a>
                        </>
                    ) : (
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default MainNav;