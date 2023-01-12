import React from 'react';
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../../graphql/mutations';

const Education = () => {
  //filter projects to get all education category

  // const { loading, error, data } = useQuery(QUERY_PROJECT_CATEGORY);
  // if (loading){
  //   return(
  //     <div>Loading...</div>
  //   );
  // }
  // if (error){
  //   return `error! ${error.message}`;
  // }

  //favorite project in category
  const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

  const favoriteProject = async (projectId) => {
    try {
      await addFavorite({
        variables: {
          projectId,
        },
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const { loading, data } = useQuery(QUERY_PROJECT_CATEGORY, {
    variables: { projectCategory: 'Education' },
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
                <Link to={`/project/${project._id}`}>
                  <h3 className="card-title">{project.projectTitle}</h3>
                </Link>
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
                <button
                  className="btn btn-light"
                  onClick={() => favoriteProject(project._id)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Education;
