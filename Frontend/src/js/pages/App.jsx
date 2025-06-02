import '../bootstrap.js';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin_account.jsx';
import Login from './Login_page.jsx';
import User from './User_account.jsx';
import Product from './Product_page.jsx';
import Footer_page from '../components/Footer.jsx';
import Sellers from './Seller_account.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Formulaire from '../components/Form_Registration.jsx';

// Components
// This component is responsible for rendering the header, footer, and the main content based on the current route
// It uses React Router for navigation between different pages of the application
import Header from '../components/Header.jsx';

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
      <Footer_page />
    </BrowserRouter>
  );
}

export default App;
