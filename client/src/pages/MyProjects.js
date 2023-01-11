//This will be for multi project view

import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries';
// import { CurrentUserContextProvider } from '../context';

const MyProjects = (props) => {
  const { id: projectId } = useParams();

  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  const user = data?.getCurrentUser || {};

  const projects = data?.getCurrentUser.projects || {}; //may need to change to array
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Projects</h1>
      <div className="row justify-content-md-center">
        {projects &&
        projects.map((project) => (
          <div className="col-md-auto d-flex" key={project._id}>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{project.projectTitle}</h3>
                <h4 className="card-subtitle mb-2 text-muted">Organization: {project.organizationName}</h4>
                <p className="card-text">Category: {project.projectCategory}</p>
                <div>
                  <p className="card-text">Description: {project.projectDescription}</p>
                  <p className="card-text">Donations Raised: {project.donations.donationAmount}</p>
                  <p className="card-text">Comments: {project.donations.commentBody}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
