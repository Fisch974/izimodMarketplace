import React, { useState } from 'react';
import '../bootstrap.js';

const initialOrders = [
    { id: 1, client: 'Alice Dupont', total: 45.50, status: 'Payée', address: '12 rue des Lilas, Lyon', phone: '0612345678' },
    { id: 2, client: 'Jean Martin', total: 78.99, status: 'En attente', address: '24 avenue Victor Hugo, Paris', phone: '0623456789' },
    { id: 3, client: 'Sophie Durand', total: 32.00, status: 'Expédiée', address: '5 rue des Écoles, Marseille', phone: '0634567890' },
    { id: 4, client: 'Marc Lefevre', total: 120.00, status: 'Annulée', address: '10 place de la République, Lille', phone: '0645678901' },
    { id: 5, client: 'Laura Moreau', total: 89.75, status: 'Payée', address: '3 chemin des Vignes, Bordeaux', phone: '0656789012' },
    { id: 6, client: 'Paul Henry', total: 50.20, status: 'Payée', address: '7 rue Pasteur, Toulouse', phone: '0667890123' },
    { id: 7, client: 'Nina Roussel', total: 25.00, status: 'En attente', address: '19 boulevard Haussmann, Paris', phone: '0678901234' },
    { id: 8, client: 'Lucas Giraud', total: 66.66, status: 'Expédiée', address: '15 avenue des Champs, Nice', phone: '0689012345' },
    { id: 9, client: 'Emma Charpentier', total: 40.90, status: 'Payée', address: '21 rue du Moulin, Nantes', phone: '0690123456' },
    { id: 10, client: 'Tom Girard', total: 132.00, status: 'Annulée', address: '2 rue des Peupliers, Dijon', phone: '0701234567' },
    { id: 11, client: 'Chloé Bernard', total: 27.30, status: 'En attente', address: '8 impasse des Roses, Strasbourg', phone: '0712345678' },
    { id: 12, client: 'Maxime Faure', total: 99.99, status: 'Expédiée', address: '4 rue Victor Hugo, Grenoble', phone: '0723456789' },
    { id: 13, client: 'Camille Lemoine', total: 15.00, status: 'Payée', address: '9 allée des Cerisiers, Rennes', phone: '0734567890' },
    { id: 14, client: 'Antoine Meunier', total: 58.20, status: 'Payée', address: '11 rue Jean Jaurès, Reims', phone: '0745678901' },
    { id: 15, client: 'Élodie Petit', total: 79.99, status: 'Annulée', address: '14 rue des Prés, Metz', phone: '0756789012' },
    { id: 16, client: 'Léo Dubois', total: 35.70, status: 'Expédiée', address: '6 rue du Parc, Amiens', phone: '0767890123' },
    { id: 17, client: 'Isabelle Colin', total: 48.25, status: 'En attente', address: '20 avenue de Paris, Limoges', phone: '0778901234' },
    { id: 18, client: 'Julien Marchand', total: 55.00, status: 'Payée', address: '17 rue Lafayette, Avignon', phone: '0789012345' },
    { id: 19, client: 'Claire Lefevre', total: 62.80, status: 'Expédiée', address: '13 place Bellecour, Lyon', phone: '0790123456' },
    { id: 20, client: 'Benjamin Laurent', total: 22.50, status: 'En attente', address: '16 rue Carnot, Besançon', phone: '0601122334' },
  ];
  

function Orders() {
  const [orders] = useState(initialOrders);

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

  return (
    <div className="container py-4">
      <h2 className="mb-4">Liste des Commandes</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Total (€)</th>
            <th>Statut</th>
            <th>Adresse</th>
            <th>Téléphone</th>

          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.total.toFixed(2)}</td>
              <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
