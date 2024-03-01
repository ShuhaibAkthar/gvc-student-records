import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"; 

function Login() {
    return (
        <body>
      <div class="main-div">
        <h1 class="head" >GVC Student Records</h1>
        <input class="textinput" type="text" placeholder="adminid"></input>
        <br />
        <input class="textinput" type="text" placeholder="password"></input>
        <br />
        <a class="forget" href="">
          forget password
        </a>
        <br />
      
          <input  type="submit" value="Login" /> 
         
        <a class="createacc" href="">
          Create account
        </a>
      </div>
    </body>
    )
}

export default Login