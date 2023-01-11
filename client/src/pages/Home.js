import { useQuery } from '@apollo/client';
import React from 'react';
import ProjectList from '../components/ProjectList';
import { QUERY_USERS } from '../graphql/queries';

const Home = () => {
  //const { loading, data } = useQuery(QUERY_CURRENT_USER);
  const { loading, data } = useQuery(QUERY_USERS);
  const projects = data?.users.projects || [];

  console.log(data);

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
