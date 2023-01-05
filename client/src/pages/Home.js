import React from "react";
import Projects from "../components/ProjectList";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <h1>Home</h1>
      <ProjectList />
    </main>
  );
};

export default Home;
