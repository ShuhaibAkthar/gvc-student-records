import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//* pages
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import CreateStudent from './pages/student/CreateStudent.jsx';
import EditStudent from './pages/student/EditStudent.jsx';
import ViewStudent from './pages/student/ViewStudent.jsx';
import ListStudents from './pages/student/ListStudents.jsx';



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/main_window" element={<Home />} />
            <Route path="/student" element={<ListStudents />} />
            <Route path="/student/create" element={<CreateStudent />} />
            <Route path="/student/edit/:id" element={<EditStudent />} />
            <Route path="/student/view/:id" element={<ViewStudent />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
)