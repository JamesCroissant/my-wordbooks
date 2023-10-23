import React, { useEffect, useState } from 'react';
import { BrowserRouter as Outlet } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';


const Main = ({ user }) => {
  const [mainUser, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default Main;