//import { useQuery } from "@apollo/client";
import React from "react";
//import ProjectList from "../components/ProjectList";
//import { QUERY_CURRENT_USER } from "../graphql/queries";

const Home = () => {
  //const { loading, data } = useQuery(QUERY_CURRENT_USER);

  // const projects = data?.getCurrentUser.projects || [];

  //console.log();
  /*return (
     <main>
       <div>
         <h1
           className="no-projects-message"
           style={{ fontSize: "1.7em", fontWeight: "bold" }}
         >
           Home
         </h1>
         <div>
           {loading ? (
             <div className="no-projects-message">Loading...</div>
           ) : (
             <ProjectList projects={projects} />
           )}
         </div>
       </div>
     </main>
   );*/

  return (
    <div className="flex-container">

      <div className="flex-child magenta">
        <img src={require("../../src/assets/Donate1.png")} alt="donate pic"/>
      </div>

      <div className="flex-child green">
        <p className="site-name-style">MONIED</p>
        <p className="mission-stmt">Nulla non qui sunt sit sint dolor consectetur dolor veniam. Occaecat eu ipsum adipisicing 
        laborum eu voluptate incididunt exercitation. Nostrud proident ea anim aliquip est consectetur proident. 
        Do nostrud irure ea ad elit ut id incididunt ad irure ex.</p>
        <p className="mission-stmt">Nulla non qui sunt sit sint dolor consectetur dolor veniam. Occaecat eu ipsum adipisicing 
        laborum eu voluptate incididunt exercitation. Nostrud proident ea anim aliquip est consectetur proident. 
        Do nostrud irure ea ad elit ut id incididunt ad irure ex. Nulla non qui sunt sit sint dolor consectetur dolor veniam. Occaecat eu ipsum adipisicing 
        laborum eu voluptate incididunt exercitation. Nostrud proident ea anim aliquip est consectetur proident. 
        Do nostrud irure ea ad elit ut id incididunt ad irure ex.</p>
        <p className="mission-stmt">Nulla non qui sunt sit sint dolor consectetur dolor veniam. Occaecat eu ipsum adipisicing 
        laborum eu voluptate incididunt exercitation. Nostrud proident ea anim aliquip est consectetur proident. 
        Do nostrud irure ea ad elit ut id incididunt ad irure ex.</p>
      </div>

    </div>
  )







};

export default Home;
