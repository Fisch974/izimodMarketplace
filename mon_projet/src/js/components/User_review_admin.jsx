import React, { useState, useRef } from 'react';
import '../bootstrap.js';

// Données fictives des avis avec le nom du magasin (au-dessus de la fonction)
const userReviews = [
    // Avis Magasin A
    { id: 1, name: "Alice", rating: 4, review: "Super produit, vraiment satisfait ! Livraison rapide.", store: "Magasin A" },
    { id: 2, name: "Charlie", rating: 3, review: "Produit correct mais un peu déçu par la qualité.", store: "Magasin A" },
    { id: 3, name: "Eve", rating: 5, review: "Parfait ! Le produit correspond exactement à mes attentes.", store: "Magasin A" },
    { id: 4, name: "Hank", rating: 4, review: "Bon produit, mais le service client pourrait être amélioré.", store: "Magasin A" },
    { id: 5, name: "Jack", rating: 4, review: "Livraison rapide et produit de qualité, mais la couleur était légèrement différente.", store: "Magasin A" },
    { id: 6, name: "Mike", rating: 3, review: "Produit moyen, pas assez performant à mon goût.", store: "Magasin A" },
    { id: 7, name: "Oscar", rating: 4, review: "Très bien, mais j'aurais aimé plus de choix.", store: "Magasin A" },
    { id: 8, name: "Sam", rating: 4, review: "Bon produit dans l'ensemble, mais un petit problème avec l'emballage.", store: "Magasin A" },
    { id: 9, name: "Tom", rating: 5, review: "Produit au top, rien à redire.", store: "Magasin A" },
    { id: 10, name: "Uma", rating: 2, review: "Très déçu, produit non conforme à la description.", store: "Magasin A" },
  
    // Avis Magasin B
    { id: 11, name: "Bob", rating: 5, review: "Excellent service, je recommande vivement.", store: "Magasin B" },
    { id: 12, name: "Frank", rating: 2, review: "Pas très satisfait. Produit abîmé à la livraison.", store: "Magasin B" },
    { id: 13, name: "Lily", rating: 5, review: "Top qualité, j'adore !", store: "Magasin B" },
    { id: 14, name: "Paul", rating: 4, review: "Très bien, mais j'aurais aimé plus de choix.", store: "Magasin B" },
    { id: 15, name: "Rita", rating: 5, review: "Juste parfait, je suis très satisfaite.", store: "Magasin B" },
    { id: 16, name: "Tom", rating: 4, review: "Bon produit, mais un peu cher pour ce que c'est.", store: "Magasin B" },
    { id: 17, name: "Uma", rating: 2, review: "Très déçu, produit non conforme à la description.", store: "Magasin B" },
    { id: 18, name: "Zoe", rating: 3, review: "Service correct, mais je m'attendais à mieux.", store: "Magasin B" },
    { id: 19, name: "Ella", rating: 4, review: "Produit fonctionnel mais la livraison a pris trop de temps.", store: "Magasin B" },
    { id: 20, name: "Victor", rating: 3, review: "Correct, mais j'espérais une meilleure expérience.", store: "Magasin B" },
  
    // Avis Magasin C
    { id: 21, name: "David", rating: 4, review: "Bonne expérience d'achat. Je reviendrai.", store: "Magasin C" },
    { id: 22, name: "Grace", rating: 5, review: "Très bien emballé, très bon produit.", store: "Magasin C" },
    { id: 23, name: "Ivy", rating: 3, review: "Assez bien, mais j'attendais mieux.", store: "Magasin C" },
    { id: 24, name: "Nina", rating: 5, review: "Recommande fortement. Aucun problème.", store: "Magasin C" },
    { id: 25, name: "Oscar", rating: 4, review: "Très bien, mais j'aurais aimé plus de choix.", store: "Magasin C" },
    { id: 26, name: "Paul", rating: 4, review: "Produit fonctionnel mais un peu cher pour ce que c'est.", store: "Magasin C" },
    { id: 27, name: "Quincy", rating: 3, review: "Correct, mais j'espérais une meilleure expérience.", store: "Magasin C" },
    { id: 28, name: "Rita", rating: 5, review: "Juste parfait, je suis très satisfaite.", store: "Magasin C" },
    { id: 29, name: "Sam", rating: 4, review: "Bon produit dans l'ensemble, mais un petit problème avec l'emballage.", store: "Magasin C" },
    { id: 30, name: "Tom", rating: 5, review: "Produit au top, rien à redire.", store: "Magasin C" }
];
  
  
  function Review() {
    // State pour gérer l'onglet actif
    const [activeTab, setActiveTab] = useState('Magasin A');
  
    // Fonction pour changer l'onglet actif
    const handleTabClick = (store) => {
      setActiveTab(store);
    };
  
    // Filtrer les avis par magasin
    const filteredReviews = userReviews.filter((review) => review.store === activeTab);
  
    // Récupérer les magasins uniques
    const stores = [...new Set(userReviews.map(review => review.store))];
  
    return (
      <div className="container py-4">
        <h2 className="mb-4">Avis des utilisateurs</h2>
  
        {/* Onglets des magasins */}
        <ul className="nav nav-tabs mb-4">
          {stores.map((store) => (
            <li className="nav-item" key={store}>
              <button
                className={`nav-link ${activeTab === store ? 'active' : ''}`}
                onClick={() => handleTabClick(store)}
              >
                {store}
              </button>
            </li>
          ))}
        </ul>
  
        {/* Affichage des avis du magasin actif */}
        <div className="row">
          {filteredReviews.map((review) => (
            <div key={review.id} className="col-md-4 mb-4">
              <div className="card review-card">
                <div className="card-body">
                  <h5 className="card-title">{review.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{review.store}</h6>
                  <div className="card-subtitle mb-2 text-muted">
                    {`Évaluation: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}`}
                  </div>
                  <p className="card-text">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Review;
