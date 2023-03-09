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
          <p className="error-text error">The provided credentials are incorrect! Please try again.</p>
        </div>
      ) : null}
      <form className="monied-form" onSubmit={handleFormSubmit}>
        <h2 className='login'>Login</h2>
        <div className="form-floating mb-3">
          <input 
            className="form-control"
            name="email"
            type="email"
            placeholder="email"
            value={formState.email}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input 
            className="form-control"
            name="password" 
            type="password"
            placeholder="password"
            value={formState.password}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="password">Password</label>
        </div>
        <button type="submit">Login</button>
        <p>
          Need an account? Sign up <Link to="/register">here</Link>
        </p>
       
      </form>
    </div>
  );
}