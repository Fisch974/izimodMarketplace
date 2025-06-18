
import React, { useState, useRef } from 'react';
import '../../bootstrap.js';


// List_Users component to display a list of users with their roles and actions
// This component is responsible for showing the users available in the system
// It includes functionality to add, edit, and delete users
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
  { id: 21, name: "Franklin Mainford", role: "Vendeur", store: "Flower Market" },
  { id: 22, name: "Dustin Harisson", role: "Vendeur", store: "Stranger Flower" },
  { id: 23, name: "Emilia Clarke", role: "Vendeur", store: "Paysages Flower" },
  { id: 24, name: "Janus Thorin", role: "Vendeur", store: "Constance Jardin" },
  { id: 25, name: "Isaac Newton", role: "Vendeur", store: "Baltimore Entrretiens" },
  { id: 26, name: "Isaac Newton", role: "Vendeur", store: "Ficus Power" },
];

// Main component to display and manage users
// This component is responsible for showing the list of users and allowing filtering by role
function List_Users() {
  const [users, setUsers] = useState(fakeUsers);
  const [activeTab, setActiveTab] = useState("Utilisateur");
  const containerRef = useRef(null);

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "Nouvel Utilisateur",
      role: "Utilisateur",
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const editUser = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, name: "Utilisateur Modifié" } : user
    );
    setUsers(updatedUsers);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const filteredUsers = users.filter(user => user.role === activeTab || activeTab === "Tous");

  return (
    <div className="container-fluid ">
      <ul className="nav nav-tabs mb-3">
        {["Utilisateur", "Vendeur"].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={addUser} className="btn btn-primary mb-3">Ajouter un utilisateur</button>

      <div ref={containerRef} className="user-list-container">
        <div className="row g-2">
          {filteredUsers.map(user => (
            <div key={user.id} className="col-md-4">
              <div className="card h-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{user.name}</h5>

                  <p className="card-text flex-grow-1">
                    <strong>Rôle:</strong> {user.role}<br />
                    <strong>Magasin:</strong> {user.role === "Vendeur" ? (user.store || "Non renseigné") : "-"}
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








