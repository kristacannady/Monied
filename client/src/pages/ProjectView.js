//Project Title
//UserName
//Project Description
//Project Goal
//Goal Met
//Donate button

//Comments of Support

import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../graphql/queries";

const SingleProject = (props) => {
  const { id: projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>{project.title}</h1>
        <p>
          <span>{project.username}</span>
        </p>
        <div>
          <p>{project.description}</p>
        </div>
        <div>
          <p>{project.goal}</p>
        </div>
        {/* {CurrentUserContextProvider.isLoggedIn && } */}
      </div>
    </div>
  );
};
