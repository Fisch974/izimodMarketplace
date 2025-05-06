import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../bootstrap.js';


// Enregistre les composants nécessaires pour Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
// Données fictives simulées (avant la fonction)
const salesDataFictive = [10, 15, 20, 30, 25, 35, 40];  // Ventes par mois (Jan, Feb, Mar, Apr, May, Jun, Jul)
const salesWeeksDataFictive = [10, 15, 20, 30, 25, 35, 40];  // Ventes par mois (Jan, Feb, Mar, Apr, May, Jun, Jul)

const visitorDataFictive = [200, 250, 300, 350, 400, 450, 500];  // Visites par mois (Jan, Feb, Mar, Apr, May, Jun, Jul)
const visitorDayDataFictive = [10, 20, 30, 40, 50, 60, 70, 90];  // Visites par mois (Jan, Feb, Mar, Apr, May, Jun, Jul)

const totalSalesFictive = salesDataFictive.reduce((acc, val) => acc + val, 0);  // Total des ventes
const totalVisitorsFictive = visitorDataFictive.reduce((acc, val) => acc + val, 0);  // Total des visites

// Simulation de ventes du jour (valeur aléatoire pour la démonstration)
const salesTodayFictive = Math.floor(Math.random() * 50);  // Simuler entre 0 et 50 ventes aujourd'hui

// Simulation de ventes du mois (total des ventes du mois courant, on prend la somme des 30 premiers jours du mois fictif)
const salesThisMonthFictive = salesDataFictive.slice(0, new Date().getDate()).reduce((acc, val) => acc + val, 0);

// Données pour les graphiques
const salesChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Ventes par mois',
      data: salesDataFictive,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

// Données pour les graphiques
const salesChartData2 = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Ventes par mois',
        data: salesWeeksDataFictive,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

const visitorChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Visites par mois',
      data: visitorDataFictive,
      fill: false,
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1
    }
  ]
};

const visitorChartData2 = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Visites par jour',
        data: visitorDayDataFictive,
        fill: false,
        borderColor: 'rgb(255, 171, 102)',
        tension: 0.1
      }
    ]
  };

function Admin_Stats() {
  // On récupère directement les données fictives sans besoin d'une simulation async
  const [salesData, setSalesData] = useState(salesChartData);
  const [salesWeeks, setSalesWeeks] = useState(salesChartData2)
  const [visitorData, setVisitorData] = useState(visitorChartData);
  const [visitorDay, setVisitorDay] = useState(visitorChartData2)
  const [totalSales, setTotalSales] = useState(totalSalesFictive);
  const [totalVisitors, setTotalVisitors] = useState(totalVisitorsFictive);
  const [salesToday, setSalesToday] = useState(salesTodayFictive);
  const [salesThisMonth, setSalesThisMonth] = useState(salesThisMonthFictive);

  return (
    <div className="m-5">
      <h2 className="mb-4">Statistiques Admin</h2>
      
      {/* Cards pour résumé des stats */}
      <div className="row">
        {/* Card Ventes Totales */}
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Ventes Totales</div>
            <div className="card-body">
              <h5 className="card-title">{totalSales} ventes</h5>
              <p className="card-text">Nombre total de ventes réalisées.</p>
            </div>
          </div>
        </div>

        {/* Card Visites Totales */}
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Visites Totales</div>
            <div className="card-body">
              <h5 className="card-title">{totalVisitors} visites</h5>
              <p className="card-text">Nombre total de visites sur le site.</p>
            </div>
          </div>
        </div>

        {/* Card Ventes du Jour */}
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Ventes du Jour</div>
            <div className="card-body">
              <h5 className="card-title">{salesToday} ventes</h5>
              <p className="card-text">Nombre de ventes réalisées aujourd'hui.</p>
            </div>
          </div>
        </div>

        {/* Card Ventes du Mois */}
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Ventes du Mois</div>
            <div className="card-body">
              <h5 className="card-title">{salesThisMonth} ventes</h5>
              <p className="card-text">Nombre de ventes réalisées ce mois-ci.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Ventes par Mois</div>
            <div className="card-body">
              <Line data={salesData} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Visites par Mois</div>
            <div className="card-body">
              <Line data={visitorData} />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Ventes de la Semaine</div>
            <div className="card-body">
              <Line data={salesWeeks} />
            </div>
          </div>
        </div>
        <div className='col-md-6'>
            <div className="card mb-3">
                <div className="card-header">Visites de la Semaine</div>
                <div className="card-body">
                <Line data={visitorDay} />
                </div>
            </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Admin_Stats;