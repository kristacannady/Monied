//this will be for single project view
//Get total amount of donations
//Progress Bar
//Image upload

import React from 'react';

import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../graphql/queries';
import Logo from "../assets/Monied-1 (1).png";
import { FaTwitter, FaFacebookSquare, FaEnvelope, FaRegUserCircle } from 'react-icons/fa';

// import { CurrentUserContextProvider } from '../context';

const ProjectView = (props) => {
  const location = useLocation();

  let getId = location.pathname.split('/');

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: getId[2] },
  });

  console.log(data);

  const comments = data?.getProjectById.donations.map((donation) => {
    return (<div>
      <div className='col-sm comment-name'><FaRegUserCircle className='user-icon'></FaRegUserCircle>{donation.donatorName}</div>
      <div className='col-sm comment-quote'>"{donation.commentBody}"</div>
    </div>);
  });

  // const test = data.getProjectById.donations.map((donation) => { 
  //return (<div>{donation.commentBody}</div>)
  //});

  console.log(comments);
  // const user = data?.getCurrentUser || {};

  const project = data?.getProjectById || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className="row justify-content-md-center ">
        <div className="col-md-auto d-flex">
          <div className="card project-view">
            <div className="new-project-form card-body ">
              <h1 className="card-title">{project.projectTitle}</h1>

              <div className="row">
                <div className="col">
                  <img src={Logo} className="rounded float-left user-image" alt="..."></img>
                </div>
                <div className="col goal-div rounded">
                  <div className='row project-div'>
                    <p className="goal-text">Goal: ${project.projectGoal}</p>
                  </div>
                  <div className='row ' >
                    <div className="progress" id="progress-styling">
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
                  <div className='row project-div'>
                    <Link to={`/donate`} state={{ projectTitle: project.projectTitle, projectId: project._id }}>
                      <button className="btn btn-light" id="donate-btn">Donate</button>
                    </Link>
                  </div>
                </div>
              </div>

              <hr id="border"></hr>

              <div>
                <p className="organizer-text">{project.organizationName} is the organizer of this project.
                  <FaTwitter className="social-icon" size={35} color={'#1DA1F2'} onClick={() => window.location.href = project.twitterAccount}></FaTwitter>
                  <FaFacebookSquare className="social-icon" size={35} color={'#3B5998'} onClick={() => window.location.href = project.facebookAccount}></FaFacebookSquare>
                  <FaEnvelope className="social-icon" size={35} color={'grey'} onClick={() => window.open('mailto:project.email')}></FaEnvelope></p>
              </div>
              <div>
                <hr id="border"></hr>
                <p className="description-text">
                  {project.projectDescription}
                </p>
              </div>
              {/* {CurrentUserContextProvider.isLoggedIn && } */}

              <hr id="border"></hr>
              <div className='comment-header '>Comments
              </div>
              <div className="note-styling">Please donate to leave a comment.</div>
              <div className="row">
                {comments}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectView;
