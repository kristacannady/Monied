import React from 'react';
import { QUERY_PROJECT_ORGANIZATION } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useLocation, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../graphql/mutations';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProjectsByOrg = (props) => {
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

  //filter projects by organization name
  const location = useLocation();

  let getOrgName = location.pathname.split('/');

  /*
 const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: getId[2] },
  });
  */

  const { loading, data } = useQuery(QUERY_PROJECT_ORGANIZATION, {
    variables: { organizationName: getOrgName[2] },
  });

  const projects = data?.getProjectByOrganization || [];

  console.log(data);

  if (loading) {
    return <div className="no-projects-message">Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="no-projects-message">
        No Projects for this organization consider making one
        <Link to="/NewProject"> here!</Link>
      </div>
    );
  }

  let favIcon = null;
  if (true) {
    favIcon = <FaRegHeart className="fav-btn" size={40} />;
  } else {
    favIcon = <FaHeart className="fav-btn" size={40} />;
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
                      {/* Add link to ProjectsByOrg */}
                      {project.organizationName}
                    </div>
                    <div className="col-sm">Comments</div>
                    <div
                      className="col-sm"
                      onClick={() => favoriteProject(project._id)}
                    >
                      {favIcon}
                    </div>
                  </div>
                </div>
                <Link className="project-link" to={`/project/${project._id}`}>
                  <h3 className="card-title">{project.projectTitle}</h3>
                </Link>
                <p className="card-text">{project.projectDescription}</p>
                <p className="card-text">Goal: ${project.projectGoal}</p>
                <div className="progress">
                  <div
                    className="progress-bar bg-custom w-50"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectsByOrg;
