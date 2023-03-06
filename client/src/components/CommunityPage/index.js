import React from 'react';
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../../graphql/mutations';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Community = () => {
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

  //filter projects to get all education category

  const { loading, data } = useQuery(QUERY_PROJECT_CATEGORY, {
    variables: { projectCategory: 'Community Outreach' },
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
            <div className="project-card card">
              <div className="new-project-form card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      {project.organizationName}
                    </div>
                    <div className="col-sm">
                      Comments
                    </div>
                    <div className="col-sm" onClick={() => favoriteProject(project._id)}>
                      <FaRegHeart className="fav-btn fav-btn:hover"size={40}  />
                    </div>
                  </div>
                </div>
                <Link className='project-link' to={`/project/${project._id}`}>
                  <h3 className="card-title">{project.projectTitle}</h3>
                </Link>
                <p className="card-text">
                  {project.projectDescription}
                </p>
                <p className="card-text">
                  Goal: ${project.projectGoal}
                </p>
                <div className="progress">
                  <div className="progress-bar bg-custom w-50" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">50%</div>
                </div>

              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Community;
