import React from 'react';
import Projects from "../components/Projects";

// link to create new projects
export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/NewProject">← Create a new project</Link>
    </div>
  );
};

// display all projects
return (
<Projects/>   );