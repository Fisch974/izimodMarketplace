import React, { useState } from 'react';
import '../bootstrap.js';


const commandes = [
    { id: 1, client: 'Alice Dupont', objet: 'Tondeuse', total: 45.5, statut: 'Payée', ref: 'a2d5d23' },
    { id: 2, client: 'Marc Lefevre', objet: 'Brouette', total: 120, statut: 'Expédiée' },
    { id: 3, client: 'Paul Henry', objet: 'Gants', total: 50.2, statut: 'En attente' },
    { id: 4, client: 'Nina Roussel', objet: 'Serre', total: 89.9, statut: 'Payée' },
    { id: 5, client: 'Lucas Giraud', objet: 'Pelle', total: 35.7, statut: 'Expédiée' },
    { id: 6, client: 'Sophie Martin', objet: 'Arrosoir', total: 15.3, statut: 'Payée' },
    { id: 7, client: 'Julien Caron', objet: 'Sécateur', total: 27.5, statut: 'En attente' },
    { id: 8, client: 'Claire Dubois', objet: 'Tuyau d’arrosage', total: 60.0, statut: 'Payée' },
    { id: 9, client: 'Antoine Petit', objet: 'Engrais', total: 23.9, statut: 'Expédiée' },
    { id: 10, client: 'Emilie Bernard', objet: 'Plantoir', total: 9.5, statut: 'En attente' },
    { id: 11, client: 'Rémi Chauvet', objet: 'Graines de tomates', total: 6.8, statut: 'Expédiée' },
    { id: 12, client: 'Isabelle Thomas', objet: 'Chariot de jardin', total: 110.0, statut: 'Payée' },
    { id: 13, client: 'Georges Perrin', objet: 'Houe', total: 42.1, statut: 'En attente' },
    { id: 14, client: 'Laura Gauthier', objet: 'Serfouette', total: 33.4, statut: 'Expédiée' },
    { id: 15, client: 'Thierry Simon', objet: 'Râteau', total: 25.0, statut: 'Payée' },
  ];
  

  function OrdersSeller() {
    const [ongletActif, setOngletActif] = useState('Payée');
    const [commande, setCommandes] = useState(commandes);
  
    const changerStatutCommande = (id, nouveauStatut) => {
      setCommandes(prev =>
        prev.map(cmd =>
          cmd.id === id ? { ...cmd, statut: nouveauStatut } : cmd
        )
      );
    };
  
    const commandesFiltrées = commande.filter(cmd => cmd.statut === ongletActif);
  
    return (
      <>
        <div className="container-fluid m-4 conteneur_orders">
          {/* Onglets */}
          <div className="nav nav-tabs mb-5">
            {['Payée', 'Expédiée', 'En attente'].map((onglet) => (
              <button
                key={onglet}
                className={`nav-link ${ongletActif === onglet ? 'active' : ''}`}
                onClick={() => setOngletActif(onglet)}
              >
                {onglet}
              </button>
            ))}
          </div>
  
          {/* Conteneur scrollable */}
          <div className='container' style={{ maxHeight: '800px', overflowY: 'auto' }}>
            <div className="carte-articles row">
              {commandesFiltrées.length > 0 ? (
                commandesFiltrées.map((cmd) => (
                  <div className="mb-4 col-md-10 col-6" key={cmd.id}>
                    <div className="card p-5 w-100">
                      <div>
                        <h5 className="">Commande #{cmd.id}</h5>
                        <p><strong>Client :</strong> {cmd.client}</p>
                        <p><strong>Objet :</strong> {cmd.objet}</p>
                        <p><strong>Total :</strong> {cmd.total.toFixed(2)} €</p>
                        <p><strong>Référence :</strong> {cmd.total.ref} </p>
                      </div>
                      <div>
                        {/* Boutons selon l'état */}
                        {ongletActif === 'Payée' && (
                          <>
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => changerStatutCommande(cmd.id, 'Expédiée')}>Expédier</button>
                            <button className="btn btn-sm btn-outline-warning me-1" onClick={() => changerStatutCommande(cmd.id, 'En attente')}>En attente</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => changerStatutCommande(cmd.id, 'Annulée')}>Annuler</button>
                          </>
                        )}
                        {ongletActif === 'Expédiée' && (
                          <>
                            <button className="btn btn-sm btn-outline-danger me-1" onClick={() => changerStatutCommande(cmd.id, 'Annulée')}>Annuler</button>
                            <button className="btn btn-sm btn-outline-warning" onClick={() => changerStatutCommande(cmd.id, 'En attente')}>En attente</button>
                          </>
                        )}
                        {ongletActif === 'En attente' && (
                          <>
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => changerStatutCommande(cmd.id, 'Payée')}>Marquer Payée</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => changerStatutCommande(cmd.id, 'Annulée')}>Annuler</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">Aucune commande.</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default OrdersSeller;









