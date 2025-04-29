import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashBoard_Seller from "../components/Board_Seller.jsx";
import Orders_seller from "../components/Orders_sellers.jsx";
import ProductSeller from "../components/Product_seller.jsx"


function Sellers() {
    return (
        <div className='d-flex'>
            {/* Menu Aside */}
            <div>
                <Menus_aside userRole="vendeur" />
            </div>

            {/* Contenu principal */}
            <div className="seller_main">
                <Routes>
                    <Route path="boardseller" element={<DashBoard_Seller />} />
                    <Route path="orderseller" element={<Orders_seller />} />
                    <Route path="productseller" element={<ProductSeller />} />
                </Routes>
            </div>
        </div>
    );
}

export default Sellers;
