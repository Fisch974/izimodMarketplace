import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashboardInfoCard from "../components/Board_Seller_User.jsx";
import Orders_seller from "../components/Orders_Seller.jsx";
import ProductSeller from "../components/Product_seller.jsx";
import AlertSeller from "../components/Alert_Seller.jsx";
import StatsSeller from "../components/Stats_Seller.jsx";
import UserReviewSeller from "../components/User_Review_Seller.jsx";

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
                    <Route path="boardseller" element={<DashboardInfoCard />} />
                    <Route path="orderseller" element={<Orders_seller />} />
                    <Route path="productseller" element={<ProductSeller />} />
                    <Route path="alertseller" element={<AlertSeller />} />
                    <Route path="statseller" element={<StatsSeller />} />
                    <Route path="reviewseller" element={<UserReviewSeller />} />
                </Routes>
            </div>
        </div>
    );
}

export default Sellers;
