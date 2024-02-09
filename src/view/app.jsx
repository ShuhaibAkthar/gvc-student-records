import React from 'react'
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Password from './pages/Password.jsx';
import Login from './pages/login/Login.jsx';




createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Login/>
 <Routes>
  
  <Route path="/main_window" element={<Password/>} />
  <Route path='/login ' element={<Login/>}/>
 </Routes>
 </BrowserRouter>
  
)