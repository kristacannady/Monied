import { useQuery } from "@apollo/client";
import React from "react";
import ProjectList from "../components/ProjectList";
import { QUERY_PROJECTS, QUERY_CURRENT_USER } from "../graphql/queries";
import { CurrentUserContext } from "../context/currentUser";

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const { data: userData } = useQuery(QUERY_CURRENT_USER);
  const projects = data?.projects || [];

  const loggedIn = CurrentUserContext.isAuthenticated;

  return (
    <main>
      <div>
        <h1>Home</h1>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList projects={projects} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
