import React from 'react';
import { Link } from 'react-router-dom';

//TODO: query users to pull firstname/lastname info or orgname info
function ProjectList({ projects, category }) {
  if (!projects.length) {
    return <h3>No Projects Active!</h3>;
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
              <Link to={`/project/${project._id}`}>
                <p className="card-text">{project.projectDescription}</p>
              </Link>
              <p className="card-text">
                Project Goal: $ {project.projectGoal}
                Click <Link to={`/donate/`}>HERE</Link> to donate!
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
