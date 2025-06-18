import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Menus_aside from "../components/Menus.jsx";
import DashboardInfoCard from "../components/seller/Board_Seller_User.jsx";
import PurchaseUser from "../components/user/Purchase_User.jsx";
import PaimentUser from "../components/user/Paiment_User.jsx";
import ReviewUser from "../components/user/Review_User.jsx";

function User() {
  const [userData, setUserData] = useState(null);

  const userFields = [
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
        console.log(data);
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
      <div>
        <Menus_aside userRole="user" />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<Navigate to="boarduser" replace />} />
          <Route
            path="boarduser"
            element={
              <DashboardInfoCard
                title="Informations de l'utilisateur :"
                initialData={userData}
                fields={userFields}
                onSave={handleUserUpdate}
              />
            }
          />
          <Route path="purchaseuser" element={<PurchaseUser />} />
          <Route path="paimentuser" element={<PaimentUser />} />
          <Route path="reviewuser" element={<ReviewUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default User;


