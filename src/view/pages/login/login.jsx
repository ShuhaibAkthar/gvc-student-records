import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div>
            <h1>Login</h1>
            <Link to="/main_window">Home</Link>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" name="username" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login