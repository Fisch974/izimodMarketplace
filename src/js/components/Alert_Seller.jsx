import React, { useState } from 'react';
import '../bootstrap.js';

function AlertSeller() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      titre: "Produit en rupture",
      type: "Stock",
      date: "2025-04-30",
      description: `Le produit {nom_produit} est en rupture de stock.`,
    },
    {
      id: 2,
      titre: "Service Jardinage absent",
      type: "Commande",
      date: "2025-04-28",
      description: "Equipe {} de jardinage absent ",
    },
    {
      id: 3,
      titre: "Service indisponible",
      type: "Avis",
      date: "2025-04-29",
      description: "Le client a indiquer que l'équipe {} n'est jamais venus",
    },
    {
      id: 4,
      titre: "Modification de politique",
      type: "Information",
      date: "2025-04-27",
      description: "La politique de retour a été mise à jour.",
    },
  ];

  return (
    <div className="conteneur_alert">
      <h2 className="mb-4">Mes alertes vendeur</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titre</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={alert.id}>
                <th scope="row">{index + 1}</th>
                <td>{alert.titre}</td>
                <td>
                  <span className={`badge bg-${getBadgeColor(alert.type)}`}>
                    {alert.type}
                  </span>
                </td>
                <td>{alert.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <div className="alert alert-info mt-4" role="alert">
          <h5>Détail de l'alerte : <strong>{selectedAlert.titre}</strong></h5>
          <p>{selectedAlert.description}</p>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setSelectedAlert(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

function getBadgeColor(type) {
  switch (type) {
    case "Stock": return "danger";
    case "Commande": return "warning";
    case "Avis": return "info";
    case "Information": return "secondary";
    default: return "primary";
  }
}

export default AlertSeller;


