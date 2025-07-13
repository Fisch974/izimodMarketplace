import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashboardInfoCard from "../components/Board_Seller_User.jsx";
import Orders_seller from "../components/Orders_Seller.jsx";
import ProductSeller from "../components/Product_seller.jsx";
import AlertSeller from "../components/Alert_Seller.jsx";
import StatsSeller from "../components/Stats_Seller.jsx";
import ReviewSeller from "../components/Review_Seller.jsx";


// Components
// This component is responsible for rendering the seller account page with its respective routes and components
function Sellers() {
    const [userData, setUserData] = useState(null);
    
      const sellerFields = [
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'adresse', label: 'Adresse' },
        { key: 'mail', label: 'Adresse Mail' },
      ];
    
      const [error, setError] = useState(null);

      const handleUserUpdate = async (updatedData) => {
        try {
          const token = localStorage.getItem('access_token');
          const res = await fetch(`http://localhost:3405/utilisateurs/${updatedData.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
          });

          if (!res.ok) throw new Error("Échec de la mise à jour des informations");

          const updatedUser = await res.json();
          setUserData(updatedUser);
          alert("Mise à jour réussie !");
        } catch (err) {
          console.error(err);
          alert("Erreur lors de la mise à jour");
        }
      };


    
      useEffect(() => {
        async function fetchUser() {
          try {
            const token = localStorage.getItem('access_token');
    
            const res = await fetch('http://localhost:3405/utilisateurs/me', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
    
            if (!res.ok) {
            const errorText = await res.text();
            console.error('Erreur:', res.status, errorText);
            throw new Error(`Erreur ${res.status} : ${errorText}`);
            }
    
            const data = await res.json();
            setUserData(data);
          } catch (error) {
            console.error(error);
            setError(error.message);
          }
        }
        fetchUser();
      }, []);
    
      if (error) return <div>Erreur : {error}</div>;
      if (!userData) return <div>Chargement des informations utilisateur...</div>;

    return (
        <div>
            {/* Menu Aside */}
            <div>
                <Menus_aside userRole="vendeur" />
            </div>

            {/* Contenu principal */}
            <div>
                <Routes>
                    <Route index element={<Navigate to="boardseller" replace />} />
                    <Route
                        path="boardseller"
                        element={
                        <DashboardInfoCard
                            title="Informations du vendeur: "
                            initialData={userData}
                            fields={sellerFields}
                            onSave={handleUserUpdate}
                        />
                        }
                    />
                    <Route path="orderseller" element={<Orders_seller />} />
                    <Route path="productseller" element={<ProductSeller />} />
                    <Route path="alertseller" element={<AlertSeller />} />
                    <Route path="statseller" element={<StatsSeller />} />
                    <Route path="reviewseller" element={<ReviewSeller />} />
                </Routes>
            </div>
        </div>
    );
}

export default Sellers;
