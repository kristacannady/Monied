//This will be for multi project view

import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries';
// import { CurrentUserContextProvider } from '../context';

const MyProjects = (props) => {
  const { id: projectId } = useParams();
  // TODO: need to work on map through .project data and displaying it on my-projects page.
  // TODO: May need to create separate page for this

  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  // const user = data?.getCurrentUser || {};

  const projects = data?.getCurrentUser.projects || []; //may need to change to array
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <h3>{project.projectTitle}</h3>
            <h4>Organization: {project.organizationName}</h4>
            <p>Category: {project.projectCategory}</p>
            <div>
              <p>Description: {project.projectDescription}</p>
              <p>Donations Raised: {project.donations.donationAmount}</p>
              <p>Comments: {project.donations.commentBody}</p>
            </div>
          </div>
        ))}
    </div>
    // <div>

    //     <h1>{project[0].projectTitle}</h1>
    //     <p>
    //       <span>
    //         {user.firstName} {user.lastName}
    //       </span>
    //     </p>
    //     <div>
    //       <p>{project[0].projectDescription}</p>
    //     </div>
    //     <div>
    //       <p>${project[0].projectGoal}</p>
    //     </div>
    //     {/* {CurrentUserContextProvider.isLoggedIn && } */}
    //   </div>
  );
};

export default MyProjects;
