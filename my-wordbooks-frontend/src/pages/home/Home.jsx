import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import logo from "../../images/logo-mywordbooks.png";


const Home = () => {
  return (
    <div id="home" className="my-5">
      <main>
        <div className="px-4 text-center">
          <div className="HomeTop">
            <h1 className="homeTitle display-4 fw-bold">MY WORDBOOKS</h1>
          </div>
          <div className="homeCenter">
            <img src={logo} alt="my-wordbooks-logo" className="homeLogo" />
            <p className="fs-4">分からない単語と意味を入力して自分だけのオリジナル単語帳を作ろう！</p>
            <p className="fs-4">Create your own original wordbooks by entering words and meanings you don't understand!</p>
          </div>
          <div className="homeBottom">
            <Link to="/login">
              <button className="btn btn-danger mx-4 px-3 btn-lg">LOGIN</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-danger mx-4 px-3 btn-lg">SIGN UP</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;