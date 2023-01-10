import React from "react";
//figure out how to import projects from database
import { QUERY_PROJECT_CATEGORY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Community = () => {
  //filter projects to get all education category

  const { loading, data } = useQuery(QUERY_PROJECT_CATEGORY,{
    variables: {projectCategory:"Community Outreach"}
  });

  const projects = data?.getCurrentUser.projects || [];

  console.log(data);

  if(loading){
    return(
      <div>Loading...</div>
    )
  }

  if(!projects){
    return(
      <div>
      No Projects for this category consider making one
      <Link to='/NewProject'>here!</Link>  
      </div>
    )
  }

  return (
    <div>
      {projects && projects.map((project)=>(
        <div key={project._id}>
          <h3>{project.projectTitle}</h3>
          <p>Organization: {project.organizationName}</p>
          <p>Category: {project.projectCategory}</p>
            <div>
              <p>Description: {project.projectDescription}</p>
              <p>Donations Raised: {project.donations.donationAmount}</p>
              <p>Comments: {project.donations.commentBody}</p>
            </div>
        </div>
  ))}
    </div>
  );
};

export default Community;
