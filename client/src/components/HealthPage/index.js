import React from "react";
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const Health = () => {
  //filter projects to get all education category
  return <></>;

  const { loading, error, data } = useQuery(QUERY_PROJECT_CATEGORY);
  if (loading) return "Loading...";
  if (error) return `error! ${error.message}`;

  return (
    <div>
      {data.filter((project) => {
        project.projectCategory === "Health Care";
      }) ? (
        <div>"Health Care Selected!</div>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default Health;
