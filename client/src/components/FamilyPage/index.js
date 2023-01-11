import React from "react";
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Family = () => {
  //filter projects to get all education category

  const { loading, data } = useQuery(QUERY_PROJECT_CATEGORY, {
    variables: { projectCategory: "Family Services" },
  });

  const projects = data?.getProjectByCategory || [];

  console.log();

  if (loading) {
    return <div className="no-projects-message">Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="no-projects-message">
        No Projects for this category consider making one
        <Link to="/NewProject"> here!</Link>
      </div>
    );
  }

  return (
    <div className="row justify-content-md-center">
      {projects &&
        projects.map((project) => (
          <div className="col-md-auto d-flex" key={project._id}>
            <div className="card">
              <div className="new-project-form card-body">
                <h3 className="card-title">{project.projectTitle}</h3>
                <p className="card-text">
                  Organization: {project.organizationName}
                </p>
                <p className="card-text">Category: {project.projectCategory}</p>
                <p className="card-text">
                  Description: {project.projectDescription}
                </p>
                <p className="card-text">
                  Donations Raised: {project.projectGoal}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Family;
