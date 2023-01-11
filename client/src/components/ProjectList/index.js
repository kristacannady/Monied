import React from 'react';
import { Link } from 'react-router-dom';

//TODO: query users to pull firstname/lastname info or orgname info
function ProjectList({ projects, category }) {
  if (!projects.length) {
    return <h3>No Projects Active!</h3>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <h3>{project.projectCategory}</h3>
            <p>
              {project.firstName} {project.lastName}
            </p>
            <div>
              <Link to={`/project/${project._id}`}>
                <p>{project.projectDescription}</p>
              </Link>
              <p>
                Project Goal: $ {project.projectGoal}
                Click <Link to={`/donate/`}>HERE</Link> to donate!
              </p>

              <p>
                Comments: {project.donations.commentBody} || Click to{' '}
                {project.commentCount ? 'see' : 'start'} support!
              </p>
            </div>
          </div>
        ))}

      {/* {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <h3>{category}</h3>
            <p>
              <Link to={`/profile/${project.user._id}`}>
                {project.firstName} {project.lastName}
              </Link>
            </p>
            <div>
              <Link to={`/project/${project._id}`}>
                <p>{project.description}</p>
                <p>
                  Comments: {project.commentBody} || Click to{' '}
                  {project.commentCount ? 'see' : 'start'} support!
                </p>
              </Link>
              Click{' '}
                
            </div>
          </div>
        ))} */}
    </div>
  );
}

export default ProjectList;
