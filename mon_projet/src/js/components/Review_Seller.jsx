import React, { useState } from 'react';
import '../bootstrap.js';

function ReviewSeller() {
  // Données fictives avec le produit
  const [reviews] = useState([
    {
      id: 1,
      client: "Marie Dupont",
      note: 5,
      produit: "Nettoyage jardin",
      commentaire: "Excellent service, rapide et efficace !",
      date: "2024-04-01"
    },
    {
      id: 2,
      client: "Jean Martin",
      note: 3,
      produit: "Engrais bio",
      commentaire: "Produit correct mais emballage abîmé.",
      date: "2024-03-28"
    },
    {
      id: 3,
      client: "Laura Petit",
      note: 4,
      produit: "Fertilisant fleur",
      commentaire: "Très bon produit, je recommande.",
      date: "2024-03-20"
    },
  ]);

  // Fonction pour afficher les étoiles
  const renderStars = (note) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < note ? "text-warning" : "text-muted"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="conteneur_product container-fluid">
      <h2 className="mb-4">📝 Avis des clients</h2>
      {reviews.length === 0 ? (
        <p>Aucun avis pour le moment.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{review.client}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{review.date}</h6>
                  <div className="mb-2">{renderStars(review.note)}</div>
                  <p className="mb-1"><strong>Produit :</strong> {review.produit}</p>
                  <p className="card-text">{review.commentaire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewSeller;
