import '../bootstrap.js';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin_page.jsx';
import Login from './Login_page.jsx';
import User from './User_account.jsx';
import Product from './product.jsx';


// Components
import Header from '../components/Header.jsx';


function App() {
  return (
<app>
    <Header />
    <BrowserRouter> {/*Integrated routing to redirect links */}
      <Routes>
        <Route path="/" element={<Product />} /> {/* Add link with path*/}
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
</app>
  );
}

export default App;
