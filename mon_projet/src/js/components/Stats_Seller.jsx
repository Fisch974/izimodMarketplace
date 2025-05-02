import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import '../bootstrap.js';

function StatsSeller() {
  // Données simulées
  const [liveVisitors, setLiveVisitors] = useState(0);

  const produitsParJour = [
    { date: 'Lun', produits: 5 },
    { date: 'Mar', produits: 8 },
    { date: 'Mer', produits: 3 },
    { date: 'Jeu', produits: 7 },
    { date: 'Ven', produits: 6 },
    { date: 'Sam', produits: 9 },
    { date: 'Dim', produits: 4 },
  ];

  const produitsParMois = [
    { mois: 'Jan', produits: 45 },
    { mois: 'Fév', produits: 60 },
    { mois: 'Mar', produits: 35 },
    { mois: 'Avr', produits: 75 },
    { mois: 'Mai', produits: 50 },
  ];

  const produitsParAn = [
    { annee: '2022', produits: 320 },
    { annee: '2023', produits: 410 },
    { annee: '2024', produits: 480 },
    { annee: '2025', produits: 530 },
  ];

  const visitesTotales = [
    { date: 'Semaine 1', visites: 120 },
    { date: 'Semaine 2', visites: 200 },
    { date: 'Semaine 3', visites: 150 },
    { date: 'Semaine 4', visites: 300 },
  ];

  // Visites en "live"
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(Math.floor(Math.random() * 30 + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">📊 Statistiques du magasin</h2>

      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <h5>Produits vendus (par jour)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={produitsParJour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="produits" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6 mb-4">
          <h5>Produits vendus (par mois)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={produitsParMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="produits" stroke="#198754" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6 mb-4">
          <h5>Produits vendus (par année)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={produitsParAn}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="annee" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="produits" fill="#6610f2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6 mb-4">
          <h5>Total des visites</h5>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitesTotales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visites" stroke="#dc3545" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card bg-light p-3 text-center">
        <h4 className="text-muted">👁️ Visiteurs en temps réel</h4>
        <h1 className="text-primary display-4">{liveVisitors}</h1>
        <p className="text-muted">Utilisateurs actifs sur vos produits en ce moment</p>
      </div>
    </div>
  );
}

export default StatsSeller;
