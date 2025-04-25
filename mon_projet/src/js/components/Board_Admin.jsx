import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import '../bootstrap.js';

const Admin = [
  {
    id: 1,
    nom: 'David',
    prenom: 'Grey',
    admin: true,
    email: 'david.grey@example.com',
    telephone: '06 92 34 56 78'
  }
];


const sellerStats = [
  { id: 1, name: 'JardinExpress', sales: 120, revenue: 3500 },
  { id: 2, name: 'GreenTools', sales: 85, revenue: 2600 },
  { id: 3, name: 'BioPlantes', sales: 102, revenue: 3100 },
  { id: 4, name: 'Nature&Co', sales: 74, revenue: 2200 },
  { id: 5, name: 'EcoVente', sales: 93, revenue: 2800 },
];

const activeUsers = 238; // nombre fictif d’utilisateurs actifs
const visitors_online = 48; // nombre fictif de visiteurs actifs

function DashBoard() {
  const totalRevenue = sellerStats.reduce((sum, s) => sum + s.revenue, 0);


  return (
    <div className="conteneur-dash d-flex">
      {/* Colonne gauche : Info admin */}
      <div className="me-5 border-end pe-4">
        <div className="pt-5 fs-5">
          {Admin.map((admin) => (
            <div key={admin.id} className="d-flex flex-column">
              {admin.admin && (
                <span className="badge bg-primary mb-3" style={{ width: 'fit-content' }}>
                  Bienvenue Admin
                </span>
              )}

              <table className="table table-sm table-bordered text-start w-auto">
                <tbody>
                  <tr>
                    <th>Nom</th>
                    <td>{admin.nom}</td>
                  </tr>
                  <tr>
                    <th>Prénom</th>
                    <td>{admin.prenom}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{admin.email}</td>
                  </tr>
                  <tr>
                    <th>Téléphone</th>
                    <td>{admin.telephone}</td>
                  </tr>
                  <tr>
                    <th>Rôle</th>
                    <td>{admin.admin ? 'Administrateur' : 'Utilisateur'}</td>
                  </tr>
                </tbody>
              </table>

              <button
                className="btn btn-outline-secondary btn-sm mt-2"
                onClick={() => alert('Fonction modification du mot de passe à implémenter')}>
                Modifier mot de passe
              </button>
            </div>
          ))}
        </div>
      </div>



      {/* Colonne droite : Cards verticales */}
      <div className="py-4 flex-grow-1">
        <div className="d-flex flex-column gap-4">
          <div className="user-actif p-5 bg-light rounded shadow">
            <h5>Utilisateurs actifs :</h5>
            <p className="fs-4 fw-bold">{activeUsers}</p>
          </div>

          <div className="affair_actif p-5 bg-light rounded shadow">
            <h5>Chiffre d'affaires total :</h5>
            <p className="fs-4 fw-bold">{totalRevenue.toLocaleString()} €</p>
          </div>

          <div className="visitor_actif p-5 bg-light rounded shadow">
            <h5>Visiteurs en ligne :</h5>
            <p className="fs-4 fw-bold">{visitors_online}</p>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default DashBoard;
