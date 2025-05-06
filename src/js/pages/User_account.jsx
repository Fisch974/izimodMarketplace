import { Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import '../bootstrap.js';
import Menus_aside from '../components/aside_menus.jsx';
import DashboardInfoCard from "../components/Board_Seller_User.jsx";
import PurchaseUser from "../components/Purchase_User.jsx";
import PaimentUser from "../components/Paiment_User.jsx";
import ReviewUser from "../components/Review_User.jsx";


const initialUser = {
  nom: 'Durand',
  prenom: 'Lucas',
  adresse: '14 avenue des Lilas',
  telephone: '0654789652',
  adresseMail: 'lucas.durand@mail.com',
  motdepasse: '********'
};

// Fields to be displayed in the user information card
// These fields are used to display the user's information in the DashboardInfoCard component
const userFields = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'adresseMail', label: 'Adresse Mail' }
];


// Main component to display the user account page with its respective routes and components
// This component is responsible for rendering the user account page with its respective routes and components
function User() {
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
                title="Informations de l'utilisateur: "
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

