import { Link } from "react-router-dom";
import React from 'react';
import { User, ShoppingCart, Star, LayoutDashboard, ShieldUser, ScanBarcode, OctagonAlert, ChartLine } from 'lucide-react';
import '../bootstrap.js';

const users = [
    { id: 1, nom: 'David', prenom: 'Grey', role: 'admin' },
    { id: 2, nom: 'Sophie', prenom: 'Martin', role: 'vendeur' },
    { id: 3, nom: 'Lucas', prenom: 'Durand', role: 'user' }
];

const menus = {
    admin: [
        { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/usersList", label: "Utilisateurs", icon: User },
        { to: "/admin/orders", label: "Commandes", icon: ShoppingCart },
        { to: "/admin/products", label: "Produits", icon: ScanBarcode },
        { to: "/admin/alerts", label: "Alertes", icon: OctagonAlert },
        { to: "/admin/stats", label: "Statistiques", icon: ChartLine },
        { to: "/admin/review", label: "Avis", icon: Star }
    ],
    vendeur: [
        { to: "/seller/boardseller", label: "Dashboard", icon: LayoutDashboard },
        { to: "/seller/orders", label: "Commandes", icon: ShoppingCart },
        { to: "/seller/products", label: "Mes Produits", icon: ScanBarcode },
        { to: "/seller/alerts", label: "Alertes", icon: ScanBarcode },
        { to: "/seller/stats", label: "Statistiques", icon: ChartLine },
        { to: "/seller/reviews", label: "Avis", icon: Star }
    ],
    user: [
        { to: "/user/profile", label: "Mon Profil", icon: ShieldUser },
        { to: "/user/orders", label: "Commandes", icon: ShoppingCart },
        { to: "/user/reviews", label: "Mes Avis", icon: Star }
    ]
};

function Menus_aside({ userRole = 'admin' }) {
    const currentUser = users.find(user => user.role === userRole);

    return (
        <aside className="sidebar">
            <div className="pb-5 d-flex align-items-start flex-column">
                {currentUser && (
                    <div className="d-flex flex-column">
                        <span className="badge bg-primary mb-1" style={{ width: 'fit-content' }}>{userRole.toUpperCase()}</span>
                        <p className="mb-0">{currentUser.prenom} {currentUser.nom}</p>
                    </div>
                )}
            </div>
            <div className="menus">
                <ul>
                    {menus[userRole]?.map((item, index) => (
                        <li key={index}>
                            <Link to={item.to}>
                                {React.createElement(item.icon, { size: 18, style: { marginRight: '8px' } })}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Menus_aside;

