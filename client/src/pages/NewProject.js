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
import { QUERY_CURRENT_USER, QUERY_PROJECTS } from "../graphql/queries";

const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [characterCount, setCharacterCount] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        const { getCurrentUser } = cache.readQuery({
          query: QUERY_CURRENT_USER,
        });
        cache.writeQuery({
          query: QUERY_CURRENT_USER,
          data: {
            getCurrentUser: {
              ...getCurrentUser,
              projects: [...getCurrentUser.projects, addProject],
            },
          },
        });
      } catch (e) {
        console.warn("First project insertion by user!");
      }

      const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addProject, ...projects] },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProject({
        variables: {
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
        },
      });

      setProjectTitle("");
      setProjectDescription("");
      setProjectCategory("");
      setProjectGoal("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Title"
          value={projectTitle}
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Description"
          value={projectDescription}
          onChange={handleChange}
        ></textarea>
        <input
          placeholder="Project Goal"
          value={projectGoal}
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewProject;
