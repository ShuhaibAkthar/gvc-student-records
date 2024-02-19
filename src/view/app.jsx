import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//* pages
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/main_window" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
)