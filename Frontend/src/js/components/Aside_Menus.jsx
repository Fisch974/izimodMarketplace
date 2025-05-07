import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import { User, ShoppingCart, Star, LayoutDashboard, ShieldUser, ScanBarcode, OctagonAlert, ChartLine, CreditCard, Menu  } from 'lucide-react';
import '../bootstrap.js';

// Initial list of users with their roles and names
const users = [
    { id: 1, nom: 'David', prenom: 'Grey', role: 'admin' },
];

// Initial list of sellers with their roles and names
const roleLabels = {
    admin: 'Menu Administrateur',
    vendeur: 'Menu Vendeur',
    user: 'Menu Utilisateur'
};

// Menu items for different user roles
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
        { to: "/seller/orderseller", label: "Commandes", icon: ShoppingCart },
        { to: "/seller/productseller", label: "Mes Produits", icon: ScanBarcode },
        { to: "/seller/alertseller", label: "Alertes", icon: OctagonAlert },
        { to: "/seller/statseller", label: "Statistiques", icon: ChartLine },
        { to: "/seller/reviewseller", label: "Avis", icon: Star }
    ],
    user: [
        { to: "/users/boarduser", label: "Mon Profil", icon: ShieldUser },
        { to: "/users/purchaseuser", label: "Achats", icon: ShoppingCart },
        { to: "/users/paimentuser", label: "Paiement", icon: CreditCard },
        { to: "/users/reviewuser", label: "Mes Avis", icon: Star }
    ]
};

// Main component to display the sidebar menu based on user role and seller role
function Menus_aside({ userRole = 'admin' }) {
    const offcanvasRef = useRef(null);
    const currentUser = users.find(user => user.role === userRole);

    const handleLinkClick = () => {
        const offcanvasElement = offcanvasRef.current;
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }
        }
    };

    const roleLabels = {
        admin: 'Menu Administrateur',
        vendeur: 'Menu Vendeur',
        user: 'Menu Utilisateur'
    };

    // Function to handle the click event on the menu links
    return (
        <>
            <button className="btn btn-primary m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                {roleLabels[userRole] || 'Menu'}
            </button>

            <div ref={offcanvasRef} className="sidebar offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <aside>
                        <div className="d-flex align-items-start flex-column">
                            {currentUser && (
                                <div className="d-flex flex-column text-white">
                                    <span className="badge bg-primary mb-1" style={{ width: 'fit-content' }}>{userRole.toUpperCase()}</span>
                                    <p className="mb-0">{currentUser.prenom} {currentUser.nom}</p>
                                </div>
                            )}
                        </div>
                        <div className="menus">
                            <ul>
                                {menus[userRole]?.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.to} onClick={handleLinkClick}>
                                            {React.createElement(item.icon, { size: 18, style: { marginRight: '8px' } })}
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}


export default Menus_aside;

