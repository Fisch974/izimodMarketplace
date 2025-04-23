import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import '../bootstrap.js';

// Simulation des données de l'admin
const fakeUsers = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", role: "Vendeur" },
  { id: 2, name: "Marie Curie", email: "marie.curie@example.com", role: "Utilisateur" },
  { id: 3, name: "Albert Einstein", email: "albert.einstein@example.com", role: "Utilisateur" },
  { id: 4, name: "Isaac Newton", email: "isaac.newton@example.com", role: "Vendeur" },
  { id: 5, name: "Nikola Tesla", email: "nikola.tesla@example.com", role: "Utilisateur" },
];

function DashBoard() {
  // État des informations de l'admin
  const [userInfo, setUserInfo] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "Admin"
  });

  // Données pour le formulaire de modification
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: ""
  });

  // Simuler des statistiques
  const [stats, setStats] = useState({
    usersCount: fakeUsers.length,
    productsCount: 30, // Exemple de nombre de produits
    ordersCount: 15, // Exemple de nombre de commandes
  });

  // Fonction pour modifier les informations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo({
      name: formData.name,
      email: formData.email,
      role: userInfo.role
    });

    setFormData({
      name: formData.name,
      email: formData.email,
      password: ""
    });

    alert("Informations mises à jour !");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Admin</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Utilisateurs</h3>
          <p>{stats.usersCount} utilisateurs</p>
        </div>
        <div className="stat-card">
          <h3>Produits</h3>
          <p>{stats.productsCount} produits</p>
        </div>
        <div className="stat-card">
          <h3>Commandes</h3>
          <p>{stats.ordersCount} commandes en cours</p>
        </div>
      </div>

      <h3>Profil de l'admin</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>

      <h3>Derniers Utilisateurs enregistrés</h3>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/admin/users/edit/${user.id}`}>Modifier</Link>
                {" | "}
                <button onClick={() => alert(`Suppression de ${user.name}`)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoard;
