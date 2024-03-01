import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import './Home.css';

function Home() {
    return (    
        <body>
    <div class="nav-div" >
    <Navbar/>
      </div>
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
        <div class="form"><div class="search-container">
          <input type="text" class="search-box" placeholder="Search..." />
          <button class="search-button">Search</button>
        </div>

       
          <h1 class="collagename">Grace Valley College of Arts and Science</h1></div>
      </div>
      
      
</body>









        // <div> 
        //    
        //     <h1>Home</h1>

        //     <h3>List Students</h3>
        //     <Link to="/student">Students List</Link>

        //     <h3>Create Student</h3>
        //     <Link to="/student/create">Create Student</Link>

        //     <h3>Edit Student</h3>
        //     <Link to="/student/edit/65d63f9993fd049770d2a6ac">Edit Student</Link>


        //     <h3>Login</h3>
        //     <Link to="/login">Login</Link>
        // </div>
    )
}

export default Home