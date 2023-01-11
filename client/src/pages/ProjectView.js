//this will be for single project view

import React from 'react';
import { useLocation } from 'react-router-dom';
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
    <div>
      <div>
        <h1>{project.projectTitle}</h1>
        <p>
          <span>
            {project.organizationName} {project.organizationName}
          </span>
        </p>
        <div>
          <p>{project.projectDescription}</p>
        </div>
        <div>
          <p>${project.projectGoal}</p>
        </div>
        {/* {CurrentUserContextProvider.isLoggedIn && } */}
      </div>
    </div>
  );
};

export default ProjectView;
