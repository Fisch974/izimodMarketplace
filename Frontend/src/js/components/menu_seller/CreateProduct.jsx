import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';


function Create_Product({ magasinId, onProductCreated }) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);


  // On regarde les fichiers uploadés via react-hook-form
  const images = watch('images');

  // Dès que les images changent, on met à jour les aperçus
  React.useEffect(() => {
    if (images && images.length > 0) {
      const objectUrls = Array.from(images).map(file => URL.createObjectURL(file));
      setPreviewImages(objectUrls);

      // Libérer les URLs quand le composant se démonte ou images changent
      return () => {
        objectUrls.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewImages([]);
    }
  }, [images]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('designation', data.designation);
    formData.append('description', data.description);
    formData.append('prix', data.prix);
    formData.append('stock', data.stock);
    formData.append('categorie', data.categorie);
    formData.append('magasin_id', magasinId);
    formData.append('dateAjout', new Date().toISOString());

    if (data.avisUtilisateur_id) {
      formData.append('avisUtilisateur_id', data.avisUtilisateur_id);
    }

    if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://localhost:3405/produits/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Erreur lors de la création du produit');

      setSubmitSuccess('Produit créé avec succès');
      setSubmitError(null);
      reset();
      setPreviewImages([]);
      if (onProductCreated) onProductCreated();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow p-4 mt-4 col-lg-8 m-auto">
      <h4 className="text-center mb-4">Créer un produit ou un service</h4>

      {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
      {submitSuccess && <div className="alert alert-success" role="alert">{submitSuccess}</div>}

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor='designation'>Désignation:</label>
          <input id='designation' className="form-control" {...register('designation', { required: true })} />
          {errors.designation && <div className="text-danger" role="alert">Désignation requise</div>}
        </div>

        <div className="mb-3">
          <label htmlFor='description'>Description:</label>
          <textarea id='description' className="form-control" {...register('description', { required: true })} />
          {errors.description && <div className="text-danger" role="alert">Description requise</div>}
        </div>

        <div className="mb-3">
          <label htmlFor='prix'>Prix (€):</label>
          <input
            id='prix'
            type="number"
            step="0.01"
            className="form-control"
            {...register('prix', { required: true, min: 0 })}
          />
          {errors.prix && <div className="text-danger" role="alert">Prix requis et doit être positif</div>}
        </div>

        <div className="mb-3">
          <label htmlFor='stock'>Stock:</label>
          <input
            id='stock'
            type="number"
            className="form-control"
            {...register('stock', { required: true, min: 0 })}
          />
          {errors.stock && <div className="text-danger" role="alert">Stock requis et doit être positif</div>}
        </div>

        <div className="mb-3">
            <label htmlFor='catégorie'>Catégorie:</label>
            <select
                id='catégorie'
                className="form-select"
                {...register('catégorie', { required: true })}
                defaultValue="produit"
            >
                <option value="produit">Produit</option>
                <option value="service">Service</option>
            </select>
            {errors.catégorie && <div className="text-danger" role="alert">Catégorie requise</div>}
        </div>


        <div className="mb-3">
          <label htmlFor='images'>Images (max 1):</label>
          <input
            id='images'
            type="file"
            multiple
            accept="image/*"
            className="form-control"
            onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 1); // max 1 image
                setSelectedFiles(files);
                setPreviewImages(files.map(file => URL.createObjectURL(file)));
            }}
            />
          {errors.images && <div className="text-danger" role="alert">Veuillez sélectionner une image</div>}
        </div>

        {/* Aperçu des images */}
        <div className="mb-3 d-flex flex-wrap gap-3">
            {previewImages.map((src, i) => (
                <div key={i} style={{ position: 'relative', width: 120, height: 120 }}>
                <img
                    src={src}
                    alt={`Aperçu ${i + 1}`}
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                    const newFiles = [...selectedFiles];
                    const newPreviews = [...previewImages];
                    newFiles.splice(i, 1);
                    newPreviews.splice(i, 1);
                    setSelectedFiles(newFiles);
                    setPreviewImages(newPreviews);
                    }}
                    style={{
                    position: 'absolute',
                    top: -11,
                    right: 6,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    padding: 1,
                    cursor: 'pointer',
                    }}
                >
                    <X size={20} color="#dc3545" />
                </button>
                </div>
            ))}
            </div>



        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Création en cours...' : 'Créer produit'}
        </button>

      </form>
    </div>
  );
}

export default Create_Product;


