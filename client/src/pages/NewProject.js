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

const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [characterCount, setCharacterCount] = useState("");
  const [projectCategory, setProjectCategory] = useState("Education");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState(0);
  const [organizationName, setOrganizationName] = useState("");

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
              projects: [...getCurrentUser?.projects, addProject],
            },
          },
        });
      } catch (e) {
        console.warn("First project insertion by user!");
      }

      // const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
      // cache.writeQuery({
      //   query: QUERY_PROJECTS,
      //   data: { projects: [addProject, ...projects] },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // console.log(projectGoal, typeof projectGoal);
    // May need to add a handle change section that can parseInt.
    //Having parseInt in form is causing some background issues. But it works.
    // var parsedGoal = parseInt(projectGoal);
    // console.log(parsedGoal, typeof parsedGoal);

    try {
      await addProject({
        variables: {
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
          organizationName,
        },
      });
      // clear form value
      setProjectTitle("");
      setProjectDescription("");
      setProjectGoal(0);
      setOrganizationName("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h3 className="section-title">What will be your new project?</h3>
      <form className="new-project-form" onSubmit={handleFormSubmit}>
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
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        ></input>
        <select
          style={{ marginBottom: "5px" }}
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
          type="number"
          placeholder="Project Goal"
          value={projectGoal}
          onChange={(e) => setProjectGoal(parseInt(e.target.value))}
        ></input>
        <button type="submit">Submit</button>
        {error && <div>Something went wrong!</div>}
      </form>
    </div>
  );
};

export default NewProject;
