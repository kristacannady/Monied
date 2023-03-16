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
        <img className= "donate-pic"src={require("../../src/assets/TestPic.png")} alt="donate pic" />
      </div>

      <div className="flex-child green monied-div">
        <p className="site-name-style">MONIED</p>
        <p className="mission-stmt">Welcome to Monied, the fundraising website that is committed to helping non-profit organizations achieve their missions.
          We provide a platform that enables non-profits to raise funds and connect with donors who share their vision.</p>
        <p className="mission-stmt">Our website offers a range of features to help non-profits create successful campaigns, including customizable campaign pages, social media integration, and donation tracking. At Monied, we strive to create a community of giving that brings together people who are passionate about making a positive impact on the world.
          We believe that every donation, no matter how small, can make a difference in the lives of those who need it most.</p>
        <p className="mission-stmt">We invite you to explore our campaigns and join us in supporting non-profit organizations that are making a difference in the world. Whether you're looking to donate, volunteer, or spread the word, your support can help create a better future for us all.
          Thank you for choosing Monied as your partner in giving back.</p>
        <div className="slogan">
        "Small Donations, Big Impact - Monied"
        </div>
      </div>


    </div>
  )







};

export default Home;
