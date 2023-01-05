import React from "react";
import ProjectList from "../components/ProjectList";
import {CurrentUserContextProvider} from "../context";
import { useQuery } from "@apollo/client";

const Home = () => {
  const loggedIn = CurrentUserContextProvider.isAuthenticated;
  const projects = data?.projects || [];

  return (
    <main>
      <h1>Home</h1>
      <ProjectList projects={projects}/>
    </main>
  );
};

export default Home;
