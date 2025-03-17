import React from 'react';

// Components
import Login from '../components/Login';
import Register from '../components/Register';
import Courses from '../components/Courses';

const Home = () => {
  return (
    <div className="container">
      <h1>Coursify</h1>
      
      <div className="sections">
        <div className="section">
          <h2>Register</h2>
          <Register />
        </div>

        <div className="section">
          <h2>Login</h2>
          <Login />
        </div>

        <div className="section">
          <h2>Courses</h2>
          <Courses />
        </div>
      </div>
    </div>
  );
};

export default Home;
