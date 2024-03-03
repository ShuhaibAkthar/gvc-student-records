import React from "react";

import { Link } from "react-router-dom";
import "./Settings.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";

const Settings = () => {
  return (
    <div class="navb">
     <Navbar/>

      <div class="container">
        <div class="sidebar">
          <a href="#">
            {" "}
            <Link to="/student">Students List</Link>
          </a>
          <a href="#">
            {" "}
            <Link to="/student/create">Create Student</Link>
          </a>
          <a href="#">
            <Link to="/settings">Settings</Link>
          </a>
          <a href="#">
            <Link to="/student/create">About us</Link>
          </a>
        </div>
        <div class="form">
          
            <h1 class="settings-head">Settings</h1>

            <div class="child21">
              <a>Profile</a>
            </div>
            <div class="child21">
              <a>Change Password</a>
            </div>
            <div class="child21">
              <a>Logout</a>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
