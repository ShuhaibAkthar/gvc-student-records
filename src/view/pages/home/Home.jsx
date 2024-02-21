import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <h3>List Students</h3>
            <Link to="/student">Students List</Link>

            <h3>Create Student</h3>
            <Link to="/student/create">Create Student</Link>


            <h3>Login</h3>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home