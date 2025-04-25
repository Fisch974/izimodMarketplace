import { Link } from "react-router-dom";
import React from 'react';
import { User, ShoppingCart, Star, LayoutDashboard, ShieldUser, ScanBarcode, OctagonAlert, ChartLine } from 'lucide-react';
import '../bootstrap.js';



const Admin = [
    {id: 1, nom:'David', prenom: 'Grey', admin: true}
]

function Menus_aside() {
    return (
        <>
            
            <aside className="sidebar">
                <div className="pb-5 d-flex align-items-start flex-column">

                    {Admin.map((admin) => (
                        <div key={admin.id} className="d-flex flex-column">
                        {admin.admin && (
                            <span className="badge bg-primary mb-1" style={{ width: 'fit-content' }}>Admin</span>
                        )}
                        <p className="mb-0">{admin.prenom} {admin.nom}</p>
                        </div>
                    ))}
                </div>
                <div className="menus">
                    <ul>
                        <li><Link to="/admin/dashboard"><LayoutDashboard size={18} style={{ marginRight: '8px' }} />Dashboard</Link></li>
                        <li><Link to="/admin/usersList"><User size={18} style={{ marginRight: '8px' }} />Utilisateurs</Link></li>
                        <li><Link to="/admin/orders"><ShoppingCart size={18} style={{ marginRight: '8px' }} />Commandes</Link></li>
                        <li><Link to="/admin/products"><ScanBarcode size={18} style={{ marginRight: '8px' }} />Produits</Link></li>
                        <li><Link to="/admin/alerts"><OctagonAlert size={18} style={{ marginRight: '8px' }} />Alertes</Link></li>
                        <li><Link to="/admin/stats"><ChartLine size={18} style={{ marginRight: '8px' }} />Statistiques</Link></li>
                        <li><Link to="/admin"><Star size={18} style={{ marginRight: '8px' }} />Avis</Link></li>
                        
                    </ul>
                </div>
                
            </aside>
        </>
    )
}

export default Menus_aside;
