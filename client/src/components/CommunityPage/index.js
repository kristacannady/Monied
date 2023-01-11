import React from 'react';
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const Community = () => {
  //filter projects to get all education category

  const { loading, data } = useQuery(QUERY_PROJECT_CATEGORY, {
    variables: { projectCategory: 'Community Outreach' },
  });

  const projects = data?.getProjectByCategory || [];

  console.log();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <div>
        No Projects for this category consider making one
        <Link to="/NewProject"> here!</Link>
      </div>
    );
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <Link to={`/project/${project._id}`}>
              <h3>{project.projectTitle}</h3>
            </Link>
            <p>Organization: {project.organizationName}</p>
            <p>Category: {project.projectCategory}</p>
            <div>
              <p>Description: {project.projectDescription}</p>
              <p>Donations Raised: {project.projectGoal}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Community;
