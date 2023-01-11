import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../context/auth';

import { LOGIN } from '../graphql/mutations';

export default function Login() {
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });

      console.log(data.login);

      Auth.login(data.login.token);
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
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <form onSubmit={handleFormSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">
          Email:
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
        <p>
          Need an account? Sign up <Link to="/register">here</Link>
        </p>
        {error && <div>Login Failed</div>}
      </form>
    </div>
  );
}
