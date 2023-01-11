import React from "react";
import { Link } from "react-router-dom";
// import ProjectList from "../components/ProjectList";
import Auth from "../context/auth";

// link to create new projects
export default function Dashboard() {
  return (
    <div className="dashboard">
      {Auth.loggedIn() ? (
        <div>
          <h2>Dashboard</h2>
          <Link
            to="/NewProject"
            style={{ color: "rgb(59, 231, 82)", fontSize: "larger" }}
          >
            ← Create a new project
          </Link>
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
