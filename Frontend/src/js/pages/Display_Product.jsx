import React, { useState, useEffect } from 'react';

function ProductDetail() {
  // Données d'exemple basées sur votre entité Produit
  const [produit, setProduit] = useState({
    id: 1,
    designation: "Smartphone Galaxy Pro",
    prix: 899.99,
    stock: 15,
    dateAjout: "2024-01-15",
    description: "Un smartphone haut de gamme avec écran OLED, processeur dernière génération et appareil photo professionnel.",
    categorie: "produit",
    imagePath: "https://via.placeholder.com/400x400/007bff/ffffff?text=Produit",
    magasin: { nom: "TechStore Paris" }
  });

  // État pour les avis
  const [avis, setAvis] = useState([
    {
      id: 1,
      note: 5,
      commentaire: "Excellent produit, très satisfait de mon achat !",
      utilisateur: "Marie D.",
      date: "2024-06-15"
    },
    {
      id: 2,
      note: 4,
      commentaire: "Bon produit mais livraison un peu lente.",
      utilisateur: "Pierre M.",
      date: "2024-06-10"
    }
  ]);

  // État pour le formulaire d'avis
  const [nouvelAvis, setNouvelAvis] = useState({
    note: 5,
    commentaire: '',
    utilisateur: ''
  });

  // État pour les étoiles hover
  const [hoverRating, setHoverRating] = useState(0);

  // Calcul de la note moyenne
  const noteMoyenne = avis.length > 0 
    ? (avis.reduce((sum, avis) => sum + avis.note, 0) / avis.length).toFixed(1)
    : 0;

  // Composant étoiles
  const StarRating = ({ rating, onRatingChange, interactive = false, size = "1.2em" }) => {
    return (
      <div className="d-flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${interactive ? 'cursor-pointer' : ''}`}
            style={{ 
              color: star <= (interactive ? (hoverRating || rating) : rating) ? '#ffc107' : '#e4e5e9',
              fontSize: size,
              cursor: interactive ? 'pointer' : 'default'
            }}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Soumission d'un nouvel avis
  const handleSubmitAvis = () => {
    if (nouvelAvis.commentaire.trim() && nouvelAvis.utilisateur.trim()) {
      const newAvis = {
        id: avis.length + 1,
        ...nouvelAvis,
        date: new Date().toLocaleDateString('fr-FR')
      };
      setAvis([newAvis, ...avis]);
      setNouvelAvis({ note: 5, commentaire: '', utilisateur: '' });
      alert('Avis ajouté avec succès !');
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Image du produit */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm">
            <img 
              src={produit.imagePath} 
              alt={produit.designation}
              className="card-img-top"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Informations produit */}
        <div className="col-lg-6">
          <div className="mb-3">
            <span className="badge bg-primary mb-2">{produit.categorie}</span>
            <h1 className="h2 fw-bold">{produit.designation}</h1>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <StarRating rating={Math.round(noteMoyenne)} />
              <span className="ms-2 text-muted">
                {noteMoyenne}/5 ({avis.length} avis)
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-primary fw-bold">{produit.prix} €</h3>
            <p className="text-muted mb-2">
              <strong>Stock disponible:</strong> {produit.stock} unités
            </p>
            <p className="text-muted mb-2">
              <strong>Magasin:</strong> {produit.magasin.nom}
            </p>
            <p className="text-muted">
              <strong>Ajouté le:</strong> {new Date(produit.dateAjout).toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{produit.description}</p>
          </div>

          <div className="d-grid gap-2 d-md-flex">
            <button className="btn btn-primary btn-lg me-md-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ajouter au panier
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Favoris
            </button>
          </div>
        </div>
      </div>

      {/* Section avis */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Avis clients</h3>
          
          {/* Résumé des avis */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <h2 className="display-4 fw-bold text-primary mb-0">{noteMoyenne}</h2>
                  <StarRating rating={Math.round(noteMoyenne)} size="1.5em" />
                  <p className="text-muted mt-2">{avis.length} avis</p>
                </div>
                <div className="col-md-9">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = avis.filter(a => a.note === star).length;
                    const percentage = avis.length > 0 ? (count / avis.length * 100) : 0;
                    return (
                      <div key={star} className="d-flex align-items-center mb-2">
                        <span className="me-2">{star}★</span>
                        <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar bg-warning" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <small className="text-muted">{count}</small>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire d'ajout d'avis */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Laisser un avis</h5>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Votre nom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nouvelAvis.utilisateur}
                      onChange={(e) => setNouvelAvis({...nouvelAvis, utilisateur: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Note</label>
                    <div className="mt-2">
                      <StarRating 
                        rating={nouvelAvis.note} 
                        onRatingChange={(rating) => setNouvelAvis({...nouvelAvis, note: rating})}
                        interactive={true}
                        size="1.5em"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Commentaire</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={nouvelAvis.commentaire}
                    onChange={(e) => setNouvelAvis({...nouvelAvis, commentaire: e.target.value})}
                    placeholder="Partagez votre expérience avec ce produit..."
                  ></textarea>
                </div>
                <button onClick={handleSubmitAvis} className="btn btn-primary">
                  Publier l'avis
                </button>
              </div>
            </div>
          </div>

          {/* Liste des avis */}
          <div className="row">
            {avis.map((avis) => (
              <div key={avis.id} className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{avis.utilisateur}</h6>
                        <StarRating rating={avis.note} />
                      </div>
                      <small className="text-muted">{avis.date}</small>
                    </div>
                    <p className="mb-0">{avis.commentaire}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {avis.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">Aucun avis pour ce produit. Soyez le premier à laisser un avis !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
