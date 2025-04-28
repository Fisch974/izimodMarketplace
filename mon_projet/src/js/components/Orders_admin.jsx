import React, { useState } from 'react';
import '../bootstrap.js';

const initialOrders = [
  { id: 1, client: 'Alice Dupont', total: 45.50, status: 'Payée', objet: 'Tondeuse à gazon', magasin: 'JardinPlus' },
  { id: 2, client: 'Jean Martin', total: 78.99, status: 'En attente', objet: 'Pelle de jardin', magasin: 'JardinExcellence' },
  { id: 3, client: 'Sophie Durand', total: 32.00, status: 'Expédiée', objet: 'Arrosoir', magasin: 'JardinPlus' },
  { id: 4, client: 'Marc Lefevre', total: 120.00, status: 'Annulée', objet: 'Brouette', magasin: 'Le Jardinier' },
  { id: 5, client: 'Laura Moreau', total: 89.75, status: 'Payée', objet: 'Serre de jardin', magasin: 'JardinExcellence' },
  { id: 6, client: 'Paul Henry', total: 50.20, status: 'Payée', objet: 'Gants de jardin', magasin: 'Le Jardinier' },
  { id: 7, client: 'Nina Roussel', total: 25.00, status: 'En attente', objet: 'Pelle à main', magasin: 'JardinPlus' },
  { id: 8, client: 'Lucas Giraud', total: 66.66, status: 'Expédiée', objet: 'Houe de jardin', magasin: 'JardinExcellence' },
  { id: 9, client: 'Emma Charpentier', total: 40.90, status: 'Payée', objet: 'Tuteur de plantes', magasin: 'Le Jardinier' },
  { id: 10, client: 'Tom Girard', total: 132.00, status: 'Annulée', objet: 'Tronçonneuse', magasin: 'JardinPlus' },
  { id: 11, client: 'Chloé Bernard', total: 27.30, status: 'En attente', objet: 'Râteau', magasin: 'JardinExcellence' },
  { id: 12, client: 'Maxime Faure', total: 99.99, status: 'Expédiée', objet: 'Housse de protection pour meubles de jardin', magasin: 'Le Jardinier' },
  { id: 13, client: 'Camille Lemoine', total: 15.00, status: 'Payée', objet: 'Sac de terreau', magasin: 'JardinPlus' },
  { id: 14, client: 'Antoine Meunier', total: 58.20, status: 'Payée', objet: 'Tondeuse manuelle', magasin: 'JardinExcellence' },
  { id: 15, client: 'Élodie Petit', total: 79.99, status: 'Annulée', objet: 'Pots de fleurs', magasin: 'Le Jardinier' },
  { id: 16, client: 'Léo Dubois', total: 35.70, status: 'Expédiée', objet: 'Plantes vivaces', magasin: 'JardinPlus' },
  { id: 17, client: 'Isabelle Colin', total: 48.25, status: 'En attente', objet: 'Arbre fruitier', magasin: 'JardinExcellence' },
  { id: 18, client: 'Julien Marchand', total: 55.00, status: 'Payée', objet: 'Brouette à main', magasin: 'Le Jardinier' },
  { id: 19, client: 'Claire Lefevre', total: 62.80, status: 'Expédiée', objet: 'Cisaille à haie', magasin: 'JardinPlus' },
  { id: 20, client: 'Benjamin Laurent', total: 22.50, status: 'En attente', objet: 'Gazon en rouleau', magasin: 'JardinExcellence' },
];

function Orders() {
  const [orders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('Expédiée');

  const getStatusClass = (status) => {
    switch (status) {
      case 'Payée':
        return 'badge bg-success';
      case 'En attente':
        return 'badge bg-warning text-dark';
      case 'Expédiée':
        return 'badge bg-info text-dark';
      case 'Annulée':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  // Filtrer les commandes selon l'onglet actif
  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Commandes - Statut : {activeTab}</h2>

      <ul className="nav nav-tabs mb-3">
        {['Expédiée', 'Payée', 'En attente', 'Annulée'].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Conteneur avec une hauteur fixe et défilement activé */}
      <div style={{ height: '450px', overflowY: 'auto', overflowX: 'hidden' }}>
        <table className="table table-bordered table-striped mb-0" style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '25%' }}>Client</th>
              <th style={{ width: '15%' }}>Total (€)</th>
              <th style={{ width: '30%' }}>Objet</th>
              <th style={{ width: '20%' }}>Magasin</th>
              <th style={{ width: '20%' }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {/* Affichage des commandes filtrées par statut */}
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.total.toFixed(2)}</td>
                <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.objet}</td>
                <td>{order.magasin}</td>
                <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;





