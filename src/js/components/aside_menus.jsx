import { Link } from "react-router-dom";
import React from 'react';
import { User, ShoppingCart, Star, LayoutDashboard } from 'lucide-react';
import '../bootstrap.js';

function Menus_aside() {
    return (
        <>
            <aside className="sidebar">
                <ul>
                    <li><Link to="/admin/dashboard"><LayoutDashboard size={18} style={{ marginRight: '8px' }} />Dashboard</Link></li>
                    <li><Link to="/admin/usersList"><User size={18} style={{ marginRight: '8px' }} />Utilisateurs</Link></li>
                    <li><Link to="product"><ShoppingCart size={18} style={{ marginRight: '8px' }} />Commandes</Link></li>
                    <li><Link to="/admin"><Star size={18} style={{ marginRight: '8px' }} />Avis</Link></li>
                </ul>
            </aside>
        </>
    )
}

export default Menus_aside;
