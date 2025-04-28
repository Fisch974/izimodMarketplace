import React, { useState } from 'react';
import '../bootstrap.js';

const initialAlerts = [
    { id: 1, type: 'Signalement', message: "L'utilisateur Jean a été signalé pour propos inappropriés.", status: 'Non lu' },
    { id: 2, type: 'Comportement suspect', message: "Tentative de connexion échouée plusieurs fois sur le compte de Laura.", status: 'Non lu' },
    { id: 3, type: 'Signalement', message: "Produit signalé comme frauduleux : 'Engrais magique 100%'.", status: 'Traité' },
    { id: 4, type: 'Comportement suspect', message: "Comportement inhabituel détecté sur le compte de Marc.", status: 'Non lu' },
    { id: 5, type: 'Signalement', message: "Plusieurs signalements pour l'utilisateur Emma.", status: 'Traité' },
];

function Alerts() {
    const [alerts, setAlerts] = useState(initialAlerts);

    const markAsRead = (id) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, status: 'Traité' } : alert
        ));
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Alertes de sécurité</h2>
            {alerts.length === 0 ? (
                <p>Aucune alerte pour le moment.</p>
            ) : (
                <ul className="list-group">
                    {alerts.map(alert => (
                        <li key={alert.id} className={`list-group-item d-flex justify-content-between align-items-start ${alert.status === 'Non lu' ? 'bg-warning-subtle' : ''}`}>
                            <div>
                                <h6 className="mb-1"><strong>{alert.type}</strong></h6>
                                <p className="mb-1">{alert.message}</p>
                                <small className="text-muted">Statut : {alert.status}</small>
                            </div>
                            {alert.status === 'Non lu' && (
                                <button className="btn btn-sm btn-outline-success" onClick={() => markAsRead(alert.id)}>
                                    Marquer comme traité
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Alerts;
