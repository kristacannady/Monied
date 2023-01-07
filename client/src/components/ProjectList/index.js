import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Yet!</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};
