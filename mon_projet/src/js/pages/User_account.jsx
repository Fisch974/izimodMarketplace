import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';

function User() {
    return (
        <div className="d-flex">
            {/* Menu aside */}
            <div>
                <Menus_aside userRole="user" />
            </div>

            {/* Contenu principal */}
            <div className="admin-main p-4" style={{ flexGrow: 1 }}>
                <Routes>

                </Routes>
            </div>
        </div>
    );
}

export default User;
