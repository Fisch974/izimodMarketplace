import { Routes, Route, Navigate, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../bootstrap.js';
import Menus_aside from "../components/Menus.jsx";
import DashboardInfoCard from "../components/seller/Board_Seller_User.jsx";
import Orders_seller from "../components/seller/Orders_Seller.jsx";
import ProductSeller from "../components/seller/Product_seller.jsx";
import AlertSeller from "../components/seller/Alert_Seller.jsx";
import StatsSeller from "../components/seller/Stats_Seller.jsx";
import ReviewSeller from "../components/seller/Review_Seller.jsx";
import CreerMagasin from "../components/seller/CreateMagasin.jsx";


// Components
// This component is responsible for rendering the seller account page with its respective routes and components
function Sellers() {
    const [userData, setUserData] = useState(null);
    const [magasinData, setMagasinData] = useState(null);
    const [hasMagasin, setHasMagasin] = useState(false);
    const [isLoadingMagasin, setIsLoadingMagasin] = useState(true);
    
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

      // Fonction pour vérifier si l'utilisateur a un magasin
      const checkUserMagasin = async (userId) => {
        try {
          const token = localStorage.getItem('access_token');
          const res = await fetch(`http://localhost:3405/magasins/check/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (!res.ok) {
            throw new Error(`Erreur ${res.status}`);
          }

          const data = await res.json();
          
          setHasMagasin(data.hasStore);
          setMagasinData(data.magasin);
        } catch (error) {
          console.error("Erreur lors de la vérification du magasin:", error);
          setHasMagasin(false);
          setMagasinData(null);
        } finally {
          setIsLoadingMagasin(false);
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

            // Vérifier si l'utilisateur a un magasin après avoir récupéré ses données
            if (data.id) {
              await checkUserMagasin(data.id);
            }

          } catch (error) {
            console.error(error);
            setError(error.message);
            setIsLoadingMagasin(false);
          }
        }
        fetchUser();
      }, []);
    
      if (error) return <div>Erreur : {error}</div>;
      if (!userData || isLoadingMagasin) return <div>Chargement des informations utilisateur...</div>;

    return (
        <div>
            {/* Menu Aside */}
            <div>
                <Menus_aside userRole="vendeur" />
            </div>

            {/* Contenu principal */}
            <div>
                <h3 className="text-center fw-bold">Bienvenue dans votre espace vendeur</h3>
                <h5 className="text-center">Ici vous pouvez consulter, personnaliser, modifier votre profil.</h5>

                {!hasMagasin && (
                  <div className="alert alert-warning text-center mx-5" role="alert">
                    ⚠️ Vous n'avez pas encore créé votre magasin. Veuillez le faire pour pouvoir gérer vos produits et commandes.
                    <Link to="/seller/creermagasin" className="btn btn-primary mt-3">Créer mon magasin</Link>
                  </div>
                )}

                {hasMagasin && magasinData && magasinData.nom && (
                  <div className="text-center my-4">
                    <h5 className="fw-bold text-success">🛒 Nom de votre magasin : {magasinData.nom}</h5>
                  </div>
                )}


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
                    <Route path="creermagasin" element={<CreerMagasin />} />
                </Routes>
            </div>
        </div>
    );
}

export default Sellers;
