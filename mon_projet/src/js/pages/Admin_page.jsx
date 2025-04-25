import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import DashBoard from '../components/Board_Admin.jsx';
import List_Users from '../components/Users_list_Admin.jsx';
import Menus_aside from '../components/aside_menus.jsx';
import Product_Manager from '../components/Manage_Product_Admin.jsx';
import Orders from "../components/Orders_admin.jsx";
import Alerts from "../components/Alert_Admin.jsx";
import Admin_Stats from "../components/Stats_Admin.jsx";

function Admin() {
    return (
        <>
            <div className='d-flex'>
                <div>
                    <Menus_aside />
                </div>
                <div className="admin-main">
                    <Routes>
                        <Route path="usersList" element={<List_Users />} />
                        <Route path="products" element={<Product_Manager />} />
                        <Route path="dashboard" element={<DashBoard />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="alerts" element={<Alerts />} />
                        <Route path="stats" element={<Admin_Stats />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Admin;
