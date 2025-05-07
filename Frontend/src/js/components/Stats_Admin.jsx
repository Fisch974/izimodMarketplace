import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../bootstrap.js';


// Importing Chart.js components for the charts
// This includes the scales, elements, and other components needed for rendering the charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
// Dummy data for sales and visitors
// This data is used to simulate the sales and visitor statistics for the admin dashboard
const salesDataFictive = [10, 15, 20, 30, 25, 35, 40]; 
const salesWeeksDataFictive = [10, 15, 20, 30, 25, 35, 40]; 

// Dummy data for visitors
// This data is used to simulate the visitor statistics for the admin dashboard
const visitorDataFictive = [200, 250, 300, 350, 400, 450, 500];  
const visitorDayDataFictive = [10, 20, 30, 40, 50, 60, 70, 90];  

// Calculating total sales and visitors
// This is done by summing up the values in the sales and visitor data arrays
const totalSalesFictive = salesDataFictive.reduce((acc, val) => acc + val, 0);  
const totalVisitorsFictive = visitorDataFictive.reduce((acc, val) => acc + val, 0);  

// Calculating sales today and this month
// This is done by generating a random number for today's sales and summing up the values for this month's sales
const salesTodayFictive = Math.floor(Math.random() * 50);  

// Calculating sales for this month
// This is done by summing up the values in the sales data array for the current month
const salesThisMonthFictive = salesDataFictive.slice(0, new Date().getDate()).reduce((acc, val) => acc + val, 0);

// Dummy data for sales and visitors
// This data is used to simulate the sales and visitor statistics for the admin dashboard
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

// Dummy data for sales and visitors
// This data is used to simulate the sales and visitor statistics for the admin dashboard
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


// Dummy data for visitors
// This data is used to simulate the visitor statistics for the admin dashboard
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


// Dummy data for visitors
// This data is used to simulate the visitor statistics for the admin dashboard
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


// Admin_Stats component to display statistics for the admin
// This component is responsible for showing the statistics of the admin dashboard
function Admin_Stats() {
  
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
      
      
      <div className="row">
        
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Ventes Totales</div>
            <div className="card-body">
              <h5 className="card-title">{totalSales} ventes</h5>
              <p className="card-text">Nombre total de ventes réalisées.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Visites Totales</div>
            <div className="card-body">
              <h5 className="card-title">{totalVisitors} visites</h5>
              <p className="card-text">Nombre total de visites sur le site.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Ventes du Jour</div>
            <div className="card-body">
              <h5 className="card-title">{salesToday} ventes</h5>
              <p className="card-text">Nombre de ventes réalisées aujourd'hui.</p>
            </div>
          </div>
        </div>      
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