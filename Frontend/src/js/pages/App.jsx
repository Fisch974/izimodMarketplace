import '../bootstrap.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import React from 'react';
import Admin from './Admin_account.jsx';
import Login from './Login_page.jsx';
import User from './User_account.jsx';
import Product from './Product_page.jsx';
import Sellers from './Seller_account.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Formulaire from '../components/register/Form_Registration.jsx';

// Components
// This component is responsible for rendering the header, footer, and the main content based on the current route
import Header from '../components/header_footer/Header.jsx';
import Footer from '../components/header_footer/Footer.jsx';
// It uses React Router for navigation between different pages of the application

// Main App component to handle routing and rendering of different pages
// This component is responsible for rendering the header, footer, and the main content based on the current route
function App() {
  return (
    <BrowserRouter> {/*Integrated routing to redirect links */}
      <Header />
      <Routes>
        <Route path="/" element={<Product />} /> {/* Add link with path*/}
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/users/*" element={<User />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/seller/*" element={<Sellers />} />
        <Route path='/form' element={<Formulaire />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
