// src/components/OnlineProducts.jsx
import React, { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import EditProduct from './EditProduct';

function OnlineProducts({magasinId, produits, isLoading, error, showMenu, setShowMenu, onDeleteSuccess }) {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/produits/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Produit supprimé avec succès");
      onDeleteSuccess(); // appel la fonction du parent pour rafraîchir
    } catch (err) {
      console.error("Suppression erreur :", err.message);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <div className="product_online">
      <div className="card shadow-lg p-5 col-lg-10 m-auto list_product">
        <h3 className="text-center">Liste des Produits en Ligne</h3>

        {isLoading && <p>Chargement des produits...</p>}
        {error && <p className="text-danger">Erreur : {error}</p>}
        {!isLoading && produits.length === 0 && <p>Aucun produit disponible.</p>}

        <ul className="list-group m-auto mt-4">
          {produits.map(produit => (
            <li key={produit.id} className="list-group-item mb-4 p-3">
              <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                {produit.imagePath && (
                  <img
                    src={`http://localhost:3405/uploads/${produit.imagePath}`}
                    alt={produit.designation}
                    style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 5 }}
                  />
                )}

                <div className="flex-grow-1 ">
                  <p className=" mb-3 fs-4 text-center"><strong>Nom:</strong> {produit.designation}</p>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <strong>Description:</strong> {produit.description}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Quantité:</strong> {produit.stock}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Catégorie:</strong> {produit.categorie}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Date d'ajout:</strong> {new Date(produit.dateAjout).toLocaleDateString()}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Note:</strong> {produit.avisUtilisateur_id ? produit.avisUtilisateur_id.note : "Aucune note"}
                    </div>
                    <div className="col-md-6 mb-2">
                      <strong>Prix:</strong> {produit.prix} €
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button onClick={() => setEditingProduct(produit)} className="btn btn-outline-primary btn-sm">
                    <Pencil size={16} /> Modifier
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(produit.id)}>
                    <Trash2 size={16} /> Supprimer
                  </button>
                </div>
              </div>
            </li>
            
          ))}
          
        </ul>
        {editingProduct && (
          <div className="modal-backdrop-custom">
            <div className="modal-content-custom">
              <EditProduct
                produit={editingProduct}
                magasinId={magasinId}
                onClose={() => setEditingProduct(null)}
                onUpdateSuccess={() => {
                  setEditingProduct(null);
                  onDeleteSuccess(); // refresh
                }}
              />
            </div>
          </div>
        )}


      </div>

    </div>
  );
}

export default OnlineProducts;

