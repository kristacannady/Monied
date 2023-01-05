import React from 'react';
import { Link } from 'react-router-dom';
// import ProjectList from "../components/ProjectList";

// link to create new projects
export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/NewProject">← Create a new project</Link>
    </div>
  );
}
