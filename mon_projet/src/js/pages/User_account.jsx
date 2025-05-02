import { Routes, Route } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashboardInfoCard from "../components/Board_Seller_User.jsx"; // ce fichier contient initialSeller et DashboardInfoCard
import PurchaseUser from "../components/Purchase_User.jsx";
import PaimentUser from "../components/Paiment_user.jsx";
import ReviewUser from "../components/Review_User.jsx";
// 👇 Données fictives pour l'utilisateur
const initialUser = {
  nom: 'Durand',
  prenom: 'Lucas',
  adresse: '14 avenue des Lilas',
  telephone: '0654789652',
  adresseMail: 'lucas.durand@mail.com',
  motdepasse: '********'
};

// 👇 Champs adaptés à l'utilisateur (pas besoin du nomMagasin)
const userFields = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'adresseMail', label: 'Adresse Mail' }
];

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
          <Route
            path="boarduser"
            element={
              <DashboardInfoCard
                title="Informations de l'utilisateur"
                initialData={initialUser}
                fields={userFields}
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

