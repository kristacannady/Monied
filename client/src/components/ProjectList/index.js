import React from 'react';
import {Link} from 'react-router-dom';

const ProjectList = ({projects,title}) =>{
    if(!projects.length){
        return <h3>No Projects Active!</h3>;
    }

    return(
        <div>
            <h3>{title}</h3>
            {projects && 
            projects.map((project)=>{
                <div key={project._id}>
                    <p>
                        <Link to={`/dashboard/${project.username}`}>{project.username}</Link>
                    </p>
                    <div>
                        <Link to={`/project/${project._id}`}>
                            <p>{project.description}</p>
                            <p>
                                Comments: {project.comments} || Click to{" "}
                                {project.commentCount ? "see" : "start"} the support!
                            </p>
                        </Link>
                    </div>
                </div>
            })}
        </div>
    );
};

export default ProjectList;