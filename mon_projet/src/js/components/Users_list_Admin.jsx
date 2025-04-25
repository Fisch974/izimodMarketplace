import React, { useState } from 'react';
import '../bootstrap.js';  // Si tu veux utiliser Bootstrap pour les styles

const fakeUsers = [
  { id: 1, name: "Jean Dupont", role: "Utilisateur" },
  { id: 2, name: "Marie Curie", role: "Utilisateur" },
  { id: 3, name: "Albert Einstein", role: "Utilisateur" },
  { id: 4, name: "Isaac Newton", role: "Vendeur", store: "Paysages Market" },
  { id: 5, name: "Ada Lovelace", role: "Utilisateur" },
  { id: 6, name: "Nikola Tesla", role: "Utilisateur" },
  { id: 7, name: "Rosalind Franklin",  role: "Utilisateur" },
  { id: 8, name: "Charles Darwin", role: "Vendeur", store: "Darwin Nature" },
  { id: 9, name: "Alan Turing", role: "Utilisateur" },
  { id: 10, name: "Galileo Galilei", role: "Utilisateur" },
  { id: 11, name: "Lise Meitner", role: "Vendeur", store: "Meitner Entretiens" },
  { id: 12, name: "James Clerk Maxwell", role: "Utilisateur" },
  { id: 13, name: "Grace Hopper", role: "Utilisateur" },
  { id: 14, name: "Stephen Hawking", role: "Utilisateur" },
  { id: 15, name: "Katherine Johnson", role: "Vendeur", store: "Johnson Flowers" },
  { id: 16, name: "Dmitri Mendeleïev", role: "Utilisateur" },
  { id: 17, name: "Marie Tharp", role: "Utilisateur" },
  { id: 18, name: "Tim Berners-Lee", role: "Vendeur", store: "Cultures World" },
  { id: 19, name: "Barbara McClintock", role: "Utilisateur" },
  { id: 20, name: "Leonardo da Vinci", role: "Utilisateur" },
];


function List_Users() {
  const [users, setUsers] = useState(fakeUsers);
  const [activeTab, setActiveTab] = useState("Utilisateur");  // Par défaut, on montre les utilisateurs

  // Fonction pour gérer l'ajout d'un utilisateur
  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "Nouvel Utilisateur",
      role: "Utilisateur",  // Par défaut, le nouvel utilisateur est un "Utilisateur"
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

  // Filtrer les utilisateurs en fonction de l'onglet sélectionné
  const filteredUsers = users.filter(user => user.role === activeTab || activeTab === "Tous");

  return (
    <div className="container py-4">

      {/* Onglets pour basculer entre "Utilisateur" et "Vendeur" */}
      <ul className="nav nav-tabs mb-3">
        {["Utilisateur", "Vendeur"].map(tab => (
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

      {/* Bouton Ajouter un utilisateur */}
      <button onClick={addUser} className="btn btn-primary mb-3">Ajouter un utilisateur</button>

      <div style={{ minHeight: '600px', maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {filteredUsers.map(user => (
            <div key={user.id} className="col-md-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <strong>Rôle:</strong> {user.role}<br />
                    {user.role === "Vendeur" && user.store && (
                      <>
                        <strong>Magasin:</strong> {user.store}
                      </>
                    )}
                  </p>
                  <div className="mt-auto">
                    <button onClick={() => editUser(user.id)} className="btn btn-warning btn-sm me-2">Modifier</button>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default List_Users;








