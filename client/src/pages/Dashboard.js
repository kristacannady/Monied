import React from "react";
import { Link } from "react-router-dom";
// import ProjectList from "../components/ProjectList";
import Auth from "../context/auth";

// link to create new projects
export default function Dashboard() {
  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <h1>Dashboard</h1>
          <Link to="/NewProject">← Create a new project</Link>
        </div>
      ) : (
        <div>
          <p>Create an account today!</p>
          <Link to="/register">Sign up!</Link>
        </div>
      )}
    </div>
  );
}
