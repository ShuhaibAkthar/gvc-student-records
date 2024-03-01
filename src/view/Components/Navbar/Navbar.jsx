import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    
      <nav id="nav">
        <div class="navTop">
          <div class="navItem1">
            <h1 class="main">GVC Student Records</h1>
          <Link to="/main_window" ><a class="prefrontpage" href="home.jsx">
              Home
            </a></Link>
            
          </div>

          <div class="navItem3">
           
          </div>

          <div class="navItem2">
           
          </div>
        </div>
      </nav>
    
  );
};

export default Navbar;
