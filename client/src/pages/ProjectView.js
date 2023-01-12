//this will be for single project view

import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../graphql/queries';
// import { CurrentUserContextProvider } from '../context';

const ProjectView = (props) => {
  const location = useLocation();

  let getId = location.pathname.split('/');

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: getId[2] },
  });

  console.log(data);
  // const user = data?.getCurrentUser || {};

  const project = data?.getProjectById || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto d-flex">
        <div className="card">
          <div className="new-project-form card-body">
            <h1 className="card-title">{project.projectTitle}</h1>
            <p className="card-text">{project.organizationName}</p>
            <p className="card-text">Category: {project.projectCategory}</p>
            <p className="card-text">
              Description: {project.projectDescription}
            </p>
            <p className="card-text">Donations Raised: {project.projectGoal}</p>
            <Link to={`/donate`}>
              <button className="btn btn-light">Donate to this cause!</button>
            </Link>
            {/* {CurrentUserContextProvider.isLoggedIn && } */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectView;
