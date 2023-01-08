import { useQuery } from "@apollo/client";
import React from "react";
import ProjectList from "../components/ProjectList";
import { QUERY_PROJECTS } from "../graphql/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

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
