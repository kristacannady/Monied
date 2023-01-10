//Donate to a project
//<card>
// Project Title
//Donation amount - Input
//Anonymous button
//leave a comment - Input
//submit button 
//</card>

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
//import {ADD_PROJECT} from '../graphql/mutations';
import { QUERY_CURRENT_USER, QUERY_PROJECTS } from "../graphql/queries";

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [characterCount, setCharacterCount] = useState("");
  const [donationComment, setDonationComment] = useState("");

  const [addDonation, { error }] = useMutation(ADD_DONATION, {
    update(cache, { data: { addDonation } }) {
      try {
        const { getCurrentUser } = cache.readQuery({
          query: QUERY_CURRENT_USER,
        });
        cache.writeQuery({
          query: QUERY_CURRENT_USER,
          data: {
            getCurrentUser: {
              ...getCurrentUser,
              projects: [...getCurrentUser.projects, addDonation],
            },
          },
        });
      } catch (e) {
        console.warn("First project insertion by user!");
      }

      const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addDonation, ...projects] },
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
      await addDonation({
        variables: {
         donationAmount,
        donationComment,
        },
      });

      setDonationAmount("");
      setDonationComment("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
        <h2>Project Name</h2>
        <div>
            <label>
                <input type="checkbox" />
                Anonymous Donation
            </label>
        </div>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Donation Amount"
          value={donationAmount}
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Comment"
          value={donationComment}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};

export default Donation;
