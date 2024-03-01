import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"; 

function Login() {

    const [login, setLogin] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { ipcRenderer } = window.electron;

        // Listen for success event
        ipcRenderer.on("success-res", (event, res) => {
            setIsLoading(false);
            setError(null);
            console.log("Login successful:", res);
            // Handle success as needed (e.g., redirect to list)
        });

        // Listen for error event
        ipcRenderer.on("error-res", (event, errorMessage) => {
            setIsLoading(false);
            setError(errorMessage);
            console.error("Error creating student:", errorMessage);
        });

        return () => {
            ipcRenderer.removeAllListeners("success-res");
            ipcRenderer.removeAllListeners("error-res");
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        setLogin({
            username: data.get('username'),
            password: data.get('password')
        });
    }


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