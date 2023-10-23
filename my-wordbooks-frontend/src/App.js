import Home from "./pages/home/Home";
// import Main from "./pages/main/Main";
import Topbar from './components/topbar/Topbar';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Wordlist from "./pages/wordlist/Wordlist";
import Quiz from "./components/quiz/Quiz";
import Form from "./components/form/Form";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./state/AuthContext";
import { useContext } from "react";
// import logo from "../src/images/logo-mywordbooks.jpg";
import React from 'react';


export default function App () {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/main" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/main" /> : <Register />} />
        <Route 
          path="/main/*"
          element={
            user ? (
              <>
                <Topbar user={user} />
                <Routes>
                  <Route path="/" element={user ? <Form /> : <Login /> } />
                  <Route path="users" element={user ? <Profile /> : <Login /> }/>
                  <Route path="words" element={user ? <Wordlist />: <Login />} />
                  <Route path="quiz" element={user ? <Quiz /> : <Login />} />
                </Routes>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}