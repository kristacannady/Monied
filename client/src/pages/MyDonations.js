import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import {
  QUERY_CURRENT_USER,
  QUERY_PROJECT,
  QUERY_DONATIONS,
} from '../graphql/queries';

//generate all user donations
const MyDonations = () => {
  const { amount: donationAmount } = useParams();

  const { loading, data } = useQuery(QUERY_CURRENT_USER);

  const user = data?.getCurrentUser || {};

  const donation = data?.getCurrentUser.donationAmount || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div className="dashboard">
      <h1>My Donations</h1>
      <div>Total Donations: {donation.donationAmount}</div>
    </div>
  );
};

export default MyDonations;
