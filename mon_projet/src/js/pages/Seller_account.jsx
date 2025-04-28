import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashBoard_Seller from "../components/Board_Seller.jsx";


function Sellers() {
    return (
        <div className='d-flex'>
            {/* Menu Aside */}
            <div>
                <Menus_aside userRole="vendeur" />
            </div>

            {/* Contenu principal */}
            <div className="admin-main p-4">
                <Routes>
                    <Route path="boardseller" element={<DashBoard_Seller />} />
                </Routes>
            </div>
        </div>
    );
}

export default Sellers;
