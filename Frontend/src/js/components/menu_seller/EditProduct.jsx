import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

function EditProduct({ magasinId, produit, onClose, onUpdateSuccess }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Remplir les champs à l'ouverture
  useEffect(() => {
    Object.entries(produit).forEach(([key, val]) => {
      if (key !== 'images' && key !== 'imagePath') setValue(key, val);
    });

    // Initialise aperçu avec l'image existante si pas de sélection de nouvelle image
    if (produit.imagePath) {
      setPreviewImages([`http://localhost:3405/uploads/${produit.imagePath}`]);
      setSelectedFiles([]); // pas de nouveaux fichiers sélectionnés par défaut
    }
  }, [produit, setValue]);

  // Met à jour l'aperçu quand selectedFiles change
  useEffect(() => {
    if (selectedFiles.length > 0) {
      const objectUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(objectUrls);

      return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    } else if (produit.imagePath) {
      setPreviewImages([`http://localhost:3405/uploads/${produit.imagePath}`]);
    } else {
      setPreviewImages([]);
    }
  }, [selectedFiles, produit.imagePath]);


  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('designation', data.designation);
    formData.append('description', data.description);
    formData.append('prix', data.prix);
    formData.append('stock', data.stock);
    formData.append('categorie', data.categorie);
    formData.append('magasin_id', magasinId);

    // Date d'ajout (optionnel dans update, à envoyer si nécessaire)
    if (data.dateAjout) {
      formData.append('dateAjout', data.dateAjout);
    }

    if (data.avisUtilisateur_id) {
      formData.append('avisUtilisateur_id', data.avisUtilisateur_id);
    }

    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => formData.append('images', file));
    } else if (produit.imagePath) {
      // Pas de nouvelle image sélectionnée, on envoie l'ancien chemin pour conserver l'image
      formData.append('imagePath', produit.imagePath);
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/produits/update/${produit.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Erreur lors de la mise à jour du produit');

      alert('Produit mis à jour avec succès');
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.error('Erreur de mise à jour :', err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow p-4 mt-4 col-lg-8 m-auto">
      <div className="d-flex justify-content-between">
        <h4>Modifier le produit</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label>Désignation</label>
          <input className="form-control" {...register('designation')} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" {...register('description')} />
        </div>
        <div className="mb-3">
          <label>Prix (€)</label>
          <input type="number" step="0.01" className="form-control" {...register('prix')} />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input type="number" className="form-control" {...register('stock')} />
        </div>
        <div className="mb-3">
          <label>Catégorie</label>
          <select className="form-select" {...register('categorie')}>
            <option value="produit">Produit</option>
            <option value="service">Service</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Nouvelle image (optionnel)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              const files = Array.from(e.target.files).slice(0, 1); // max 1 image
              setSelectedFiles(files);
            }}
          />
        </div>

        {/* Aperçu des images */}
        <div className="m-3 d-flex gap-2 m-auto">
          {previewImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`apercu-${i}`}
              style={{ width: 250, height: 200, objectFit: 'cover', borderRadius: 5 }}
            />
          ))}
        </div>

        <button className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? 'Mise à jour...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

