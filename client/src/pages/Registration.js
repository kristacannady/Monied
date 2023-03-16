import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_USER } from '../graphql/mutations';

import Auth from '../context/auth';

export default function Registration() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [registerUser, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      Auth.login(data.createUser.token);
      navigate('/my-projects');
      window.location.reload();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      {error ? (
        <div>
          <p className="error-text error">
            The provided credentials are incorrect! Please try again.
          </p>
        </div>
      ) : null}
      <form className="monied-form" onSubmit={handleFormSubmit}>
        <h2 className="login">Register</h2>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={formState.email}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={formState.password}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
        <button className="btn btn-light btn-outline-success" type="submit">
          <strong>Sign Up!</strong>
        </button>
        <p>
          Already have an account? Login <Link to="/register">here</Link>
        </p>
      </form>
    </div>
  );
}
