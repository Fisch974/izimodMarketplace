import React, { useState } from 'react';
import '../bootstrap.js';

function ReviewUser() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      note: 5,
      produit: "Nettoyage jardin",
      commentaire: "Excellent service, rapide et efficace !",
      date: "2024-04-01",
      magasin: "Flower Garden"
    },
    {
      id: 2,
      note: 3,
      produit: "Engrais bio",
      commentaire: "Produit correct mais emballage abîmé.",
      date: "2024-03-28",
      magasin: "Jardin Plus"
    },
    {
      id: 3,
      note: 4,
      produit: "Fertilisant fleur",
      commentaire: "Très bon produit, je recommande.",
      date: "2024-03-20",
      magasin: "Destiny Flower"
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ note: 0, commentaire: '' });

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleEdit = (review) => {
    setEditId(review.id);
    setEditData({ note: review.note, commentaire: review.commentaire });
  };

  const handleSave = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, ...editData } : r));
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({ note: 0, commentaire: '' });
  };

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
    <div className="p-5 conteneur_user_review">
      <h2 className="mb-4">📝 Avis</h2>
      {reviews.length === 0 ? (
        <p>Aucun avis pour le moment.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{review.date}</h6>

                  {editId === review.id ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label">Note (1 à 5)</label>
                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          max="5"
                          value={editData.note}
                          onChange={(e) => setEditData({ ...editData, note: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Commentaire</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          value={editData.commentaire}
                          onChange={(e) => setEditData({ ...editData, commentaire: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-success btn-sm" onClick={() => handleSave(review.id)}>
                          Valider
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                          Annuler
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2">{renderStars(review.note)}</div>
                      <p><strong>Magasin:</strong> {review.magasin}</p>
                      <p className="mb-1"><strong>Produit :</strong> {review.produit}</p>
                      <p className="card-text">{review.commentaire}</p>
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(review)}>
                          Modifier
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(review.id)}>
                          Supprimer
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewUser;
