import React, { useState } from 'react';
import '../bootstrap.js';

const initialProducts = [
  { id: 1, name: 'Pelle de jardin', category: 'Outillage', price: 15, validated: false },
  { id: 2, name: 'Gants de protection', category: 'Protection', price: 8, validated: true },
  { id: 3, name: 'Engrais bio', category: 'Produits de jardin', price: 12, validated: false },
  { id: 4, name: 'Tondeuse électrique', category: 'Outillage', price: 120, validated: true },
  { id: 5, name: 'Sécateur ergonomique', category: 'Outillage', price: 22, validated: false },
  { id: 6, name: 'Casque de sécurité', category: 'Protection', price: 30, validated: true },
  { id: 7, name: 'Paillage naturel', category: 'Produits de jardin', price: 10, validated: false },
  { id: 8, name: 'Pulvérisateur manuel', category: 'Outillage', price: 25, validated: true },
  { id: 9, name: 'Combinaison anti-UV', category: 'Protection', price: 40, validated: false },
  { id: 10, name: 'Graines de tomates', category: 'Produits de jardin', price: 5, validated: true },
  { id: 11, name: 'Houe rotative', category: 'Outillage', price: 28, validated: true },
  { id: 12, name: 'Lunettes de protection', category: 'Protection', price: 12, validated: false },
  { id: 13, name: 'Compost organique', category: 'Produits de jardin', price: 18, validated: true },
  { id: 14, name: 'Débroussailleuse thermique', category: 'Outillage', price: 140, validated: false },
  { id: 15, name: 'Gants anti-coupures', category: 'Protection', price: 20, validated: true },
  { id: 16, name: 'Engrais liquide', category: 'Produits de jardin', price: 9, validated: true },
  { id: 17, name: 'Fourche à bêcher', category: 'Outillage', price: 35, validated: false },
  { id: 18, name: 'Genouillères de jardinage', category: 'Protection', price: 15, validated: true },
  { id: 19, name: 'Terreau universel', category: 'Produits de jardin', price: 7, validated: false },
  { id: 20, name: 'Tuyau d’arrosage 20m', category: 'Outillage', price: 32, validated: true },
];

const categories = ['Tous', 'Outillage', 'Protection', 'Produits de jardin'];

function Product_Manager() {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const toggleValidation = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, validated: !p.validated } : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const editProduct = (id) => {
    alert(`Fonction d'édition du produit ID ${id} à implémenter !`);
  };

  const filteredProducts = activeCategory === 'Tous'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Gestion des Produits</h2>

      {/* Onglets catégories */}
      <ul className="nav nav-tabs mb-3">
        {categories.map(cat => (
          <li className="nav-item" key={cat}>
            <button
              className={`nav-link ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Conteneur scrollable pour éviter les sauts */}
      <div style={{ minHeight: '600px', maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }}>
        <table className="table table-striped" style={{ minWidth: '1100px' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price} €</td>
                <td>
                  {product.validated ? (
                    <span className="badge bg-success">Validé</span>
                  ) : (
                    <span className="badge bg-warning text-dark">En attente</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '20px', minWidth: '250px' }}>
                    <button className="btn btn-sm btn-primary" onClick={() => editProduct(product.id)}>
                      Modifier
                    </button>
                    <button
                      className={`btn btn-sm ${product.validated ? 'btn-warning text-dark' : 'btn-success'}`}
                      onClick={() => toggleValidation(product.id)}
                      style={{ width: '90px' }}
                    >
                      {product.validated ? 'Invalider' : 'Valider'}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.id)}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product_Manager;




