import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../../bootstrap.js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

const DashBoard = ({ title = '', initialData = {}, fields = [], onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [editKey, setEditKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (key) => {
    setEditKey(key);
    setEditValue(formData[key]);
  };

  const handleCancel = () => {
    setEditKey(null);
    setEditValue('');
  };

  const handleSave = async (key) => {
    const updatedData = { ...formData, [key]: editValue };
    setFormData(updatedData);
    setEditKey(null);

    // Appel API
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/utilisateurs/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      const updatedUser = await res.json();
      setFormData(updatedUser);
      alert('Mise à jour réussie !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="m-5">
      <div className="py-4">
        <h2 className="mb-4 text-primary fw-bold">TABLEAU DE BORD ADMINISTRATEUR</h2>
        <h3 className="text-center mb-3 bg-primary w-50 m-auto text-white rounded p-2">
          {title} {formData.nom} {formData.prenom}
        </h3>

        {/* Infos modifiables de l'admin */}
        <div className="card p-4 mb-5 bg-light">
          <h5 className="fw-bold mb-3">Informations personnelles :</h5>
          {fields.map((field, i) => (
            <div key={field.key} className="mb-3">
              <strong>{field.label} :</strong>{' '}
              {editKey === field.key ? (
                <>
                  <input
                    type={field.key === 'motDePasse' ? 'password' : 'text'}
                    className="form-control mt-1"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="btn-group mt-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleSave(field.key)}>
                      Valider
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                      Annuler
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="ms-2">{field.key === 'motDePasse' ? '********' : formData[field.key]}</span>
                  <button className="btn btn-outline-primary btn-sm ms-3" onClick={() => handleEdit(field.key)}>
                    Modifier
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Cartes résumé admin */}
        <div className="row g-4 justify-content-center">
          <Link to="/admin/usersList" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-primary card-admin w-100">
              <div className="card-body text-center">
                <h5>UTILISATEURS</h5>
                <p className="fs-4 fw-bold">238</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/orders" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-success card-admin w-100">
              <div className="card-body text-center">
                <h5>COMMANDES</h5>
                <p className="fs-4 fw-bold">512</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/products" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-secondary card-admin w-100">
              <div className="card-body text-center">
                <h5>PRODUITS</h5>
                <p className="fs-4 fw-bold">120</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/alerts" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-danger card-admin w-100">
              <div className="card-body text-center">
                <h5>ALERTES</h5>
                <p className="fs-4 fw-bold">10</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/stats" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-warning card-admin w-100">
              <div className="card-body text-center">
                <h5>STATS</h5>
                <p className="fs-4 fw-bold">3500 €</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/avis" className="text-decoration-none col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
            <div className="card text-white bg-info card-admin w-100">
              <div className="card-body text-center">
                <h5>AVIS</h5>
                <p className="fs-4 fw-bold">85</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Graphiques */}
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card p-3">
              <h5 className="fw-bold text-center bg-info text-white p-2 rounded">Graphique des Ventes (Simulation)</h5>
              <PieChart width={300} height={250}>
                <Pie data={pieData2} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {pieData2.map((entry, index) => (
                    <Cell key={`sales-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3">
              <h5 className="fw-bold text-center bg-info text-white p-2 rounded">Répartition des utilisateurs</h5>
              <PieChart width={300} height={250}>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`users-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;



