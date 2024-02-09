import React from 'react'
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Password from './pages/Password.jsx';



createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
  
  <Route path="/main_window" element={<Password/>} />
 </Routes>
 </BrowserRouter>
  
)