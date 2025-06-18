// src/components/RoleSelector.jsx
import React from 'react';
import '../../bootstrap.js';

const RoleSelector = ({ onSelect }) => {
  return (
    <div className="mt-4 text-center">
      <h5>Choisissez votre profil : </h5>
      <button type="button" className="btn btn-outline-primary m-2" onClick={() => onSelect('utilisateur')}>Client</button>
      <button type="button" className="btn btn-outline-success m-2" onClick={() => onSelect('vendeur')}>Vendeur</button>
    </div>
  );
};

export default RoleSelector;
