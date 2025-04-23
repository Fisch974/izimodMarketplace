import React, { useState } from 'react';
import '../bootstrap.js';  // Si tu veux utiliser Bootstrap pour les styles

const fakeUsers = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", role: "Utilisateur" },
  { id: 2, name: "Marie Curie", email: "marie.curie@example.com", role: "Utilisateur" },
  { id: 3, name: "Albert Einstein", email: "albert.einstein@example.com", role: "Utilisateur" },
  { id: 4, name: "Isaac Newton", email: "isaac.newton@example.com", role: "Vendeur" },
  { id: 5, name: "Ada Lovelace", email: "ada.lovelace@example.com", role: "Utilisateur" },
  { id: 6, name: "Nikola Tesla", email: "nikola.tesla@example.com", role: "Utilisateur" },
  { id: 7, name: "Rosalind Franklin", email: "rosalind.franklin@example.com", role: "Utilisateur" },
  { id: 8, name: "Charles Darwin", email: "charles.darwin@example.com", role: "Vendeur" },
  { id: 9, name: "Alan Turing", email: "alan.turing@example.com", role: "Utilisateur" },
  { id: 10, name: "Galileo Galilei", email: "galileo.galilei@example.com", role: "Utilisateur" },
  { id: 11, name: "Lise Meitner", email: "lise.meitner@example.com", role: "Vendeur" },
  { id: 12, name: "James Clerk Maxwell", email: "james.maxwell@example.com", role: "Utilisateur" },
  { id: 13, name: "Grace Hopper", email: "grace.hopper@example.com", role: "Utilisateur" },
  { id: 14, name: "Stephen Hawking", email: "stephen.hawking@example.com", role: "Utilisateur" },
  { id: 15, name: "Katherine Johnson", email: "katherine.johnson@example.com", role: "Vendeur" },
  { id: 16, name: "Dmitri Mendeleïev", email: "dmitri.mendeleiev@example.com", role: "Utilisateur" },
  { id: 17, name: "Marie Tharp", email: "marie.tharp@example.com", role: "Utilisateur" },
  { id: 18, name: "Tim Berners-Lee", email: "tim.bernerslee@example.com", role: "Vendeur" },
  { id: 19, name: "Barbara McClintock", email: "barbara.mcclintock@example.com", role: "Utilisateur" },
  { id: 20, name: "Leonardo da Vinci", email: "leonardo.davinci@example.com", role: "Utilisateur" },
];

function List_Users() {
  const [users, setUsers] = useState(fakeUsers);

  // Fonction pour gérer l'ajout d'un utilisateur
  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "Nouvel Utilisateur",
      email: "nouvel.utilisateur@example.com",
      role: "Utilisateur",
    };
    setUsers([...users, newUser]);
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  // Fonction pour gérer l'édition d'un utilisateur
  const editUser = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, name: "Utilisateur Modifié" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {/* Bouton Ajouter un utilisateur */}
      <button onClick={addUser} className="btn btn-primary mb-3">Ajouter un utilisateur</button>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Nom</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Rôle</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{user.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{user.email}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{user.role}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                <button onClick={() => editUser(user.id)} className="btn btn-warning btn-sm btn-modifier">Modifier</button>
                <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List_Users;
