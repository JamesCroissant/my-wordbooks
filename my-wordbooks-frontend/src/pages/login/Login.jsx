import React, { useContext, useRef } from 'react';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom';
import "./Login.css";

export default function Login () {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };
  
  return (
    <div>
      <div className="container mt-5">
        <div className="loginTop text-center">
          <h1 className="loginTitle display-5 fw-bold mb-7">Login</h1>
        </div>
        <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3 col-10 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="loginInputEmail" 
              aria-describedby="emailHelp"
              required
              ref={email} 
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 col-10 mx-auto">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="loginInputPassword"
              required
              minLength="6"
              ref={password}
            />
          </div>
          <div className="d-grid justify-content-center text-center">
            <button type="submit" className="loginRegisterButton btn btn-danger my-3 col-1.8 mx-auto">Submit</button>
            <span className="loginForgot text-center">Forgot your Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton btn btn-danger my-3 col-1.8 mx-auto">SignUp</button>
            </Link>
          </div>
        </form>
      </div>
    </div>

  )
};