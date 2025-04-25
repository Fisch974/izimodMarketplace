import React from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Simuler quelques données pour le résumé du tableau de bord
const activeUsers = 238;  // nombre fictif d’utilisateurs actifs
const totalOrders = 512;  // nombre fictif de commandes
const totalProducts = 120;  // nombre fictif de produits
const totalAlerts = 10;  // nombre fictif d'alertes
const totalReviews = 85;  // nombre fictif d'avis
const totalRevenue = 3500;  // Chiffre d'affaires total

const pieData = [
  { name: 'Utilisateurs actifs', value: 238 },
  { name: 'Visiteurs en ligne', value: 48 },
  { name: 'Vendeurs', value: 20 },
];

const pieData2 = [
  { name: 'Ventes de produits', value: 620 },
  { name: 'Ventes de services', value: 80 },
  { name: 'Ventes en cours', value: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



function DashBoard() {
  return (
    <div className="conteneur-dash">
      <div className="container py-4">
        <h2 className="mb-4">Tableau de Bord</h2>

        {/* Cartes résumées */}
        <div className="row g-4 justify-content-center">
          {/* Utilisateurs */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card  card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Utilisateurs</h5>
                <p className="fs-4 fw-bold flex-grow-1">{activeUsers}</p>
                <Link to="/admin/usersList" className="btn btn-light mt-auto">les utilisateurs</Link>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Commandes</h5>
                <p className="fs-4 fw-bold flex-grow-1">{totalOrders}</p>
                <Link to="/admin/orders" className="btn btn-light mt-auto">les commandes</Link>
              </div>
            </div>
          </div>

          {/* Produits */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card  card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Produits</h5>
                <p className="fs-4 fw-bold flex-grow-1">{totalProducts}</p>
                <Link to="/admin/products" className="btn btn-light mt-auto">les produits</Link>
              </div>
            </div>
          </div>

          {/* Alertes */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Alertes</h5>
                <p className="fs-4 fw-bold flex-grow-1">{totalAlerts}</p>
                <Link to="/admin/alerts" className="btn btn-light mt-auto">les alertes</Link>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Statistiques</h5>
                <p className="fs-4 fw-bold flex-grow-1">{totalRevenue.toLocaleString()} €</p>
                <Link to="/admin/stats" className="btn btn-light mt-auto">les statistiques</Link>
              </div>
            </div>
          </div>

          {/* Avis */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Avis</h5>
                <p className="fs-4 fw-bold flex-grow-1">{totalReviews}</p>
                <Link to="/admin/avis" className="btn btn-light mt-auto">les avis</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques et résumés supplémentaires */}
        <div className="row py-4">
          <div className="col-md-6">
            <div className="card p-4">
              <h5>Graphique des Ventes (Simulation)</h5>
              <div style={{ height: '200px', backgroundColor: '#f1f1f1' }}>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Graphique Ventes</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4">
              <h5>Répartition des Produits par Catégorie (Simulation)</h5>
              <div style={{ height: '200px', backgroundColor: '#f1f1f1' }}>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Graphique Catégories</p>
              </div>
            </div>
          </div>
        </div>

        <div className='graph'>
          <div className="bg-white shadow rounded p-4" style={{ width: '350px' }}>
            <h5 className="mb-3">Répartition des utilisateurs</h5>
            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white shadow rounded p-4" style={{ width: '350px' }}>
            <h5 className="mb-3 ">Répartition des ventes</h5>
            <PieChart width={300} height={250}>
              <Pie
                data={pieData2}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default DashBoard;

