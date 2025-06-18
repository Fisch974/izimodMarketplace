// src/components/OnlineProducts.jsx
import React from 'react';
import { Menu, Store, Brush, Radio, RectangleEllipsis, ArrowDownToLine } from 'lucide-react';

function OnlineProducts({ produits, isLoading, error, showMenu, setShowMenu }) {
  return (
    <div className="product_online">
      

      {/* Liste des produits */}
      <div className="card shadow-lg p-5 col-lg-10 m-auto list_product">
        <h3 className="text-center">Liste des Produits en Ligne</h3>

        {isLoading && <p>Chargement des produits...</p>}
        {error && <p className="text-danger">Erreur : {error}</p>}
        {!isLoading && produits.length === 0 && <p>Aucun produit disponible.</p>}

        <ul className="list-group m-auto mt-4">
          {produits.map(produit => (
            <li key={produit.id} className="list-group-item d-flex align-items-center">
              {produit.imagePath && (
                <img
                  src={`http://localhost:3405/uploads/${produit.imagePath}`}
                  alt={produit.designation}
                  style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '150px' }}
                />
              )}
              <div className='bg-green p-3 rounded'>
                <h5 className="mb-5">{produit.designation}</h5>
                <small>{produit.description}</small><br/>
                <strong>{produit.prix} €</strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OnlineProducts;
