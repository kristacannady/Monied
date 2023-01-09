//Create A New Project
//<card>
//Project Title - Input
//Project Category - Dropdown
//Project Description - Input
//Project Goal - Input
//Submit button
//</card>

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../graphql/mutations";
import { QUERY_CURRENT_USER } from "../graphql/queries";

import Logo from "../assets/monied-logo.png";

import Auth from "../context/auth";

const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [characterCount, setCharacterCount] = useState("");
  const [projectCategory, setProjectCategory] = useState("Education");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [projectOrganization, setProjectOrganization] = useState("");

  const [createProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { createProject } }) {
      try {
        const { getCurrentUser } = cache.readQuery({
          query: QUERY_CURRENT_USER,
        });
        cache.writeQuery({
          query: QUERY_CURRENT_USER,
          data: {
            getCurrentUser: {
              ...getCurrentUser,
              projects: [...getCurrentUser.projects, createProject],
            },
          },
        });
      } catch (e) {
        console.warn("First project insertion by user!");
      }

      const { projects } = cache.readQuery({ query: QUERY_CURRENT_USER });
      cache.writeQuery({
        query: QUERY_CURRENT_USER,
        data: { projects: [createProject, ...projects] },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createProject({
        variables: {
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
          projectOrganization,
        },
      });

      setProjectTitle("");
      setProjectDescription("");
      setProjectGoal("");
      setProjectOrganization("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <img style={{ width: "250px" }} src={Logo} />
          <h3>Create a new project!</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              required
              type="text"
              placeholder="Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            ></input>
            <input
              required
              type="text"
              placeholder="Organization"
              value={projectOrganization}
              onChange={(e) => setProjectOrganization(e.target.value)}
            ></input>
            <select
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
            >
              <option value="Education">Education</option>
              <option value="Community Outreach">Community Outreach</option>
              <option value="Health Care">Health Care</option>
              <option value="Religious">Religious</option>
              <option value="Family Services">Family Services</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              required
              placeholder="Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            ></textarea>
            <input
              required
              type="text"
              placeholder="Project Goal"
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
            ></input>
            <img style={{ width: "100px" }} src={Logo} />
            <button type="submit">Monied!</button>
            {error && <div>Something went wrong!</div>}
          </form>
        </div>
      ) : (
        <div>
          <img src={Logo} />
          <p>You need to be logged in to use this feature!</p>
        </div>
      )}
    </div>
  );
};

export default NewProject;
