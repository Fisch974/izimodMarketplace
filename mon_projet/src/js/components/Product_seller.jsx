import React, { useState } from 'react';
import '../bootstrap.js';

function ProductSeller() {
  const [activeTab, setActiveTab] = useState('create');
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    prix: '',
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, image: file, imagePreview: imageURL }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titre || !form.prix || !form.image) {
      alert('Titre, prix et image sont obligatoires.');
      return;
    }

    const nouveauProduit = {
      id: Date.now(),
      titre: form.titre,
      description: form.description,
      prix: parseFloat(form.prix),
      imageURL: form.imagePreview,
    };

    setProduits(prev => [nouveauProduit, ...prev]);
    setForm({ titre: '', description: '', prix: '', image: null, imagePreview: null });
    setActiveTab('view'); // redirige vers "Voir produits"
  };

  return (
    <div className="container-fluid my-4">
      {/* Onglets */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Créer un produit
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            Voir les produits
          </button>
        </li>
      </ul>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'create' && (
        <div className="d-flex" style={{ height: '80vh' }}>
          {/* Formulaire à gauche */}
          <div style={{ flex: '0 0 400px', marginRight: '20px' }}>
            <div className="card p-4 h-100">
              <h4>Ajouter un produit</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titre"
                    value={form.titre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Prix (€)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="prix"
                    value={form.prix}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {form.imagePreview && (
                    <div className="mt-3">
                      <img
                        src={form.imagePreview}
                        alt="Aperçu"
                        className="img-fluid"
                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Ajouter</button>
              </form>
            </div>
          </div>

          {/* Aperçu produits à droite */}
          <div className="flex-grow-1 overflow-auto pe-2">
            <h5>Aperçu produits</h5>
            {produits.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {produits.map(prod => (
                  <div className="col" key={prod.id}>
                    <div className="card h-100">
                      {prod.imageURL && (
                        <img
                          src={prod.imageURL}
                          className="card-img-top"
                          alt={prod.titre}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{prod.titre}</h5>
                        <p className="card-text">{prod.description}</p>
                        <p><strong>{prod.prix.toFixed(2)} €</strong></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucun produit pour l’instant.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'view' && (
        <div style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {produits.length > 0 ? (
              produits.map(prod => (
                <div className="col" key={prod.id}>
                  <div className="card h-100">
                    {prod.imageURL && (
                      <img
                        src={prod.imageURL}
                        className="card-img-top"
                        alt={prod.titre}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{prod.titre}</h5>
                      <p className="card-text">{prod.description}</p>
                      <p><strong>{prod.prix.toFixed(2)} €</strong></p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun produit à afficher.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSeller;
