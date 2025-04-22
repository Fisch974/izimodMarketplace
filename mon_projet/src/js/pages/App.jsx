import '../bootstrap.js';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin_page.jsx';
import Login from './Login_page.jsx';
import User from './User_account.jsx';


function App() {
  return (
    
    <BrowserRouter> {/*Integrated routing to redirect links */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Add link with path*/}
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
