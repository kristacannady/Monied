//this will be for single project view

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../graphql/queries';
// import { CurrentUserContextProvider } from '../context';

const ProjectView = (props) => {
  const location = useLocation();
  const projectId = '63bcafb8b0132966c40533a3';
  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { _id: projectId },
  });
  console.log(location.pathname);
  console.log(data);
  // const user = data?.getCurrentUser || {};

  // const project = data?.getCurrentUser.projects || {};
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <div>
  //       <h1>{project[0].projectTitle}</h1>
  //       <p>
  //         <span>
  //           {user.firstName} {user.lastName}
  //         </span>
  //       </p>
  //       <div>
  //         <p>{project[0].projectDescription}</p>
  //       </div>
  //       <div>
  //         <p>${project[0].projectGoal}</p>
  //       </div>
  //       {/* {CurrentUserContextProvider.isLoggedIn && } */}
  //     </div>
  //   </div>
  // );
};

export default ProjectView;
