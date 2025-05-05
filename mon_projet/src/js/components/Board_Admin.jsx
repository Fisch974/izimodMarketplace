import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const activeUsers = 238;
const totalOrders = 512;
const totalProducts = 120;
const totalAlerts = 10;
const totalReviews = 85;
const totalRevenue = 3500;



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
  const users = [
    { id: 1, nom: 'David', prenom: 'Grey', role: 'admin' },
  ];

  
  return (
    <>
      <div className=" m-5">
      <div className="py-4">
        <h2 className="mb-4 text-primary fw-bold">TABLEAU DE BORD ADMINISTRATEUR</h2>
        <h3 className='text-center mb-3 bg-primary w-25 m-auto text-white rounded'>
          {users.map((admin, index) => (
            <div key={index}>ADMIN: {admin.nom} {admin.prenom}</div>
          ))}
        </h3>

        {/* Cartes résumées */}
        <div className="row g-4 justify-content-center">

          {/* Carte réutilisable avec lien */}
          <Link to="/admin/usersList" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-primary">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">UTILISATEURS</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{activeUsers}</p>
                </div>
                
              </div>
            </div>
          </Link>

          <Link to="/admin/orders" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-success">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">COMMANDES</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{totalOrders}</p>
                </div>
                
              </div>
            </div>
          </Link>

          <Link to="/admin/products" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-secondary">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">PRODUITS</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{totalProducts}</p>
                </div>
                
              </div>
            </div>
          </Link>

          <Link to="/admin/alerts" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-danger">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">ALERTES</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{totalAlerts}</p>
                </div>
                
              </div>
            </div>
          </Link>

          <Link to="/admin/stats" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-warning">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">STATISTIQUES</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{totalRevenue.toLocaleString()} €</p>
                </div>
                
              </div>
            </div>
          </Link>

          <Link to="/admin/avis" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white mb-3 fixed-card card-admin w-100 bg-info">
              <div className="card-body d-flex flex-column">
                <div className='m-auto'>
                  <h5 className="card-title">AVIS CLIENTS</h5>
                  <p className="fs-4 fw-bold flex-grow-1 text-center">{totalReviews}</p>
                </div>
                
              </div>
            </div>
          </Link>

        </div>

        {/* Graphiques et résumés supplémentaires */}
        <div className="row py-4 graph">
          <div className="col-md-6">
            <div className="card p-2">
              <h5 className='fw-bold text-center bg-info'>Graphique des Ventes (Simulation)</h5>
              <div style={{ height: '200px', backgroundColor: '#f1f1f1', }} className='rounded'>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Graphique Ventes</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-2">
              <h5 className='fw-bold text-center bg-info'>Répartition des Produits par Catégorie (Simulation)</h5>
              <div style={{ height: '200px', backgroundColor: '#f1f1f1' }} className='rounded'>
                <p style={{ textAlign: 'center', paddingTop: '80px' }}>Graphique Catégories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques en camembert */}
        <div className='graph'>
          <div className="bg-white shadow rounded p-4 graph-rond" style={{ width: '350px' }}>
            <h5 className="mb-3 ">Répartition des utilisateurs</h5>
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

          <div className="bg-white shadow rounded p-4 graph-rond" style={{ width: '350px' }}>
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
    </>
    
  );
}

export default DashBoard;


