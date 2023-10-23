import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Register () {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const baseUrl = "http://localhost:5000/api";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // パスワードと確認用のパスワードが合っているかどうかを確認
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity('Incorrect password')
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post(`${baseUrl}/auth/register`, user);
        navigate("/login");

      } catch (err) {
      console.log(err);
    }
  }};

  return (
    <div className="container mt-5">
      <div className="registerTop text-center">
        <h1 className="registerTitle display-5 fw-bold mb-7">SignUp</h1>
      </div>
      <form className="registerBox" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3 col-10 mx-auto">
          <label htmlFor="exampleInputUsername" className="form-label">UserName</label>
          <input 
            type="username" 
            className="form-control" 
            id="registerInputUsername" 
            aria-describedby="usernameHelp"
            required 
            ref={username}
          />
        </div>

        <div className="mb-3 col-10 mx-auto">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="registerInputEmail" 
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
            id="registerInputPassword1"
            required 
            minLength="6" 
            ref={password}
          />
          
        </div>
        <div className="mb-3 col-10 mx-auto">
          <label htmlFor="exampleInputPassword2" className="form-label">confirm password</label>
          <input 
            type="password" 
            className="form-control" 
            id="registerInputPassword2"
            required 
            minLength="6" 
            ref={passwordConfirmation} 
          />
        </div>

        <div className="d-grid justify-content-center text-center">
          <button 
            type="submit" 
            className="loginRegisterButton btn btn-danger my-3 col-1.8" 
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
};