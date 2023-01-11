import { useQuery } from "@apollo/client";
import React from "react";
import ProjectList from "../components/ProjectList";
import { QUERY_CURRENT_USER } from "../graphql/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  const projects = data?.getCurrentUser.projects || [];

  console.log(data);

  return (
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
  );
};

export default Home;
