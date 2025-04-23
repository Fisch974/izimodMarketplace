import '../bootstrap.js';
import React from 'react';
import Menus_aside from '../components/aside_menus.jsx';
import List_Users from '../components/Users_list.jsx';
import Product_Manager from '../components/Manage_Product.jsx';
import { Routes, Route } from "react-router-dom";
import DashBoard from '../components/Board_Users.jsx';


function Admin() {
    return (
        <div className='d-flex'>
            <div>
                <Menus_aside />
            </div>
            <div className="admin-main">
                <Routes>
                    <Route path="usersList" element={<List_Users />} />
                    <Route path="products" element={<Product_Manager />} />
                    <Route path="dashboard" element={<DashBoard />} />
                </Routes>
            </div>
        </div>


    );
}



export default Admin;