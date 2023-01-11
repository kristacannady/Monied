import React from 'react';
import { Link } from 'react-router-dom';

//TODO: query users to pull firstname/lastname info or orgname info
function ProjectList({ projects, category }) {
  if (!projects.length) {
    return (
      <h3 className="no-projects-message" style={{ fontSize: "25px" }}>
        No Projects Active!
      </h3>
    );
  }

  return (
    <div className="row justify-content-md-center">
    {projects &&
    projects.map((project) => (
      <div className="col-md-auto d-flex" key={project._id}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{project.projectCategory}</h3>
            <p className="card-text">{project.firstName} {project.lastName}</p>
            <div>
              <p className="card-text"><Link to={`/project/${project._id}`}>{project.projectTitle}</Link></p>
              <p className="card-text">
                Project Goal: ${project.projectGoal}</p>
                <p>Click <Link to={`/donate/`}>HERE</Link> to donate!
              </p>
              <p className="card-text">
                Comments: {project.donations.commentBody} || Click to{' '}
                {project.commentCount ? 'see' : 'start'} support!
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ProjectList;
