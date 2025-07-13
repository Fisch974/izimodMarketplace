import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../bootstrap.js';
import DashBoard from '../components/Board_Admin.jsx';
import List_Users from '../components/Users_list_Admin.jsx';
import Menus_aside from '../components/aside_menus.jsx';
import Product_Manager from '../components/Manage_Product_Admin.jsx';
import Orders from "../components/Orders_admin.jsx";
import Alerts from "../components/Alert_Admin.jsx";
import Admin_Stats from "../components/Stats_Admin.jsx";
import Review from "../components/User_Review_Admin.jsx";

function Admin() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const adminFields = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'mail', label: 'mail' },
    { key: 'motDePasse', label: 'Mot de passe' },
  ];

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
      <Menus_aside userRole="admin" />
      <div>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <DashBoard
                title="Bienvenue"
                initialData={userData}
                fields={adminFields}
                onSave={handleUserUpdate}
              />
            }
          />
          <Route path="usersList" element={<List_Users />} />
          <Route path="products" element={<Product_Manager />} />
          <Route path="orders" element={<Orders />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="stats" element={<Admin_Stats />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;

