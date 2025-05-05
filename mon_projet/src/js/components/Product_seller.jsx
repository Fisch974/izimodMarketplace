import React, { useState } from 'react';
import '../bootstrap.js';

function ProductSeller() {
  const [activeTab, setActiveTab] = useState('createProduct');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];

    for (let i = 0; i < files.length && newImages.length < 3; i++) {
      newImages.push({
        file: files[i],
        preview: URL.createObjectURL(files[i]),
      });
    }

    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'createProduct' ? 'active' : ''}`}
            onClick={() => setActiveTab('createProduct')}
          >
            Créer Produit
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'onlineProduct' ? 'active' : ''}`}
            onClick={() => setActiveTab('onlineProduct')}
          >
            Produit en ligne
          </button>
        </li>
      </ul>

      {activeTab === 'createProduct' && (
        <div className="row justify-content-center">
          {/* Formulaire à gauche */}
          <div className="col-lg-8">
            <div className=" p-4">
              <h3 className="mb-4 text-center">Créer un Nouveau Produit</h3>

              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="categorySelect" className="form-label fw-bold">Catégorie</label>
                    <select id="categorySelect" className="form-select">
                      <option value="1">Article</option>
                      <option value="2">Service</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="designationInput" className="form-label fw-bold">Désignation</label>
                    <input type="text" className="form-control" id="designationInput" placeholder="Nom du produit" />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="priceInput" className="form-label fw-bold">Prix (€)</label>
                    <input type="number" className="form-control" id="priceInput" placeholder="0.00" />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="stockInput" className="form-label fw-bold">Stock</label>
                    <input type="number" className="form-control" id="stockInput" placeholder="Quantité disponible" />
                  </div>

                  <div className="col-12">
                    <label htmlFor="descriptionTextarea" className="form-label fw-bold">Description</label>
                    <textarea className="form-control" id="descriptionTextarea" rows="3" placeholder="Décrivez le produit..."></textarea>
                  </div>

                  <div className="col-12">
                    <label htmlFor="imageInput" className="form-label fw-bold">Ajouter 1 images de votre produit</label>
                    <input
                      className="form-control"
                      type="file"
                      id="imageInput"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={images.length >= 1}
                    />
                    <label>* Image au format JPEG</label>
                  </div>

                  <div className="col-12 text-end mt-4">
                    <button type="submit" className="btn btn-primary px-5">Créer</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Aperçu à droite de la card */}
          <div className="col-lg-3">
            {[0].map((slot) => (
              <div className="card mb-3 shadow-sm" key={slot}>
                <div className="card-header text-center bg-info">Image {slot + 1}</div>
                <div className="card-body d-flex justify-content-center align-items-center" style={{ height: '200px'}}>
                  {images[slot] ? (
                    <div className="position-relative w-100">
                      <img
                        src={images[slot].preview}
                        alt={`preview-${slot}`}
                        className="img-fluid rounded"
                        style={{ objectFit: 'contain', width: '100%', height: '200px' }}
                      />
                      <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-2 bg-white"
                        aria-label="Supprimer"
                        onClick={() => removeImage(slot)}
                      ></button>
                    </div>
                  ) : (
                    <span className="text-muted">Aucune image</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'onlineProduct' && (
        <div className="card shadow-lg p-4 col-lg-10 mx-auto list_product">
          <h3 className="text-center">Liste des Produits en Ligne</h3>
          {/* À compléter */}
        </div>
      )}
    </div>
  );
}

export default ProductSeller;





