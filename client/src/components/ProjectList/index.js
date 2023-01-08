import React from "react";
import { Link } from "react-router-dom";

function ProjectList({ projects, category }) {
  if (!projects.length) {
    return <h3>No Projects Active!</h3>;
  }

  return (
    <div>
      <h3>{category}</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <p>
              <Link to={`/profile/${project.user._id}`}>
                {project.firstName} {project.lastName}
              </Link>
            </p>
            <div>
              <Link to={`/project/${project._id}`}>
                <p>{project.description}</p>
                <p>
                  Comments: {project.commentBody} || Click to{" "}
                  {project.commentCount ? "see" : "start"} support!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProjectList;
