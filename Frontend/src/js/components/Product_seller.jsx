import React, { useEffect, useState } from 'react';
import '../bootstrap.js';
import { Menu, Store, Brush, SquarePlus, Radio, RectangleEllipsis, ArrowDownToLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Function to create a new product seller
// This component is responsible for creating a new product and managing the images associated with it
function ProductSeller() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeTab, setActiveTab] = useState('createProduct');
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [magasinData, setMagasinData] = useState(null);
  const [hasMagasin, setHasMagasin] = useState(false);
  const [isLoadingMagasin, setIsLoadingMagasin] = useState(true);
  const [produits, setProduits] = useState([]);
  const [isLoadingProduits, setIsLoadingProduits] = useState(false);
  const [errorProduits, setErrorProduits] = useState(null);

  const fetchProduits = async () => {
    if (!magasinData?.id) return; // si pas de magasin, on sort

    setIsLoadingProduits(true);
    setErrorProduits(null);


    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/produits/magasin/${magasinData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });


      if (!res.ok) throw new Error('Erreur lors du chargement des produits');

      const data = await res.json();
      console.log(data)
      setProduits(data);

    } catch (err) {
      setErrorProduits(err.message);
    } finally {
      setIsLoadingProduits(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'onlineProduct' && magasinData) {
      fetchProduits();
    }
  }, [activeTab, magasinData]);




  const checkUserMagasin = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/magasins/check/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }

      const data = await res.json();
      console.log("Données magasin :", data);
          
      setHasMagasin(data.hasStore);
      setMagasinData(data.magasin);
    } catch (error) {
      console.error("Erreur lors de la vérification du magasin:", error);
      setHasMagasin(false);
      setMagasinData(null);
    } finally {
      setIsLoadingMagasin(false);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://localhost:3405/utilisateurs/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Erreur lors de la récupération utilisateur');

        const data = await res.json();
        if (data.id) {
          await checkUserMagasin(data.id);
        }


        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    }

  fetchUser();
  }, []);


  

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
    console.log("Images chargées :", newImages); // Ajout ici
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCreateProduits = async (data) => {
    try {
      const magasinId = magasinData?.id;

      if (!magasinId) {
        alert("Magasin non trouvé.");
        return;
      }

      // Create FormData object to send multipart/form-data
      const formData = new FormData();
      formData.append('designation', data.designation.toString());
      formData.append('prix', data.prix);
      formData.append('stock', data.stock);
      formData.append('description', data.description.toString());
      formData.append('categorie', data.categorie.toString());
      formData.append('magasinId', magasinId);


      // Add images to FormData
      if (images.length === 0) {
        alert("Veuillez ajouter au moins une image.");
        return;
      }
      images.forEach(img => {
        formData.append('images', img.file); // ✅ fichier envoyé
      });

      const response = await fetch('http://localhost:3405/produits/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData // ✅ pas de JSON ici, c’est un multipart/form-data
      });

      console.log(response);
      if (!response.ok) throw new Error('Produit non enregistré');
      const result = await response.json();
      

      alert("✅ Produit créé avec succès !");
      setImages([]); // Reset images after successful upload
      fetchProduits(); // Recharge la liste des produits
    } catch (error) {
      alert(error.message || "Erreur lors de l'enregistrement");
    }
  };


  if (error) return <div className="alert alert-danger">Erreur : {error}</div>;
  if (!userData) return <div>Chargement...</div>;

  if (!hasMagasin) {
    return (
      <div className="alert alert-warning text-center m-5">
        ⚠️ Vous devez d'abord créer un magasin avant d'ajouter un produit.<br />
        <Link to="creermagasin" className="btn btn-primary mt-3">Créer mon magasin</Link>
      </div>
    );
  }

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
            Produit
          </button>
        </li>
      </ul>

      {activeTab === 'createProduct' && (
        <div className="row justify-content-center">
          {/* Formulaire à gauche */}
          <div className="col-lg-8">
            <div className=" p-4">
              <h3 className="mb-4 text-center">Créer un Nouveau Produit</h3>

              <form onSubmit={handleSubmit(handleCreateProduits)}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="categorySelect" className="form-label fw-bold">Catégorie</label>
                    <select id="categorySelect" className="form-select" {...register("categorie", { required: true })}>
                      <option value="1">Article</option>
                      <option value="2">Service</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="designationInput" className="form-label fw-bold">Désignation</label>
                    <input type="text" className="form-control" id="designationInput" placeholder="Nom du produit" {...register("designation", { required: true })} />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="priceInput" className="form-label fw-bold">Prix (€)</label>
                    <input type="number" className="form-control" id="priceInput" placeholder="0.00" {...register("prix", { required: true })} />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="stockInput" className="form-label fw-bold">Stock</label>
                    <input type="number" className="form-control" id="stockInput" placeholder="Quantité disponible" {...register("stock", { required: true })} />
                  </div>

                  <div className="col-12">
                    <label htmlFor="descriptionTextarea" className="form-label fw-bold">Description</label>
                    <textarea className="form-control" id="descriptionTextarea" rows="3" placeholder="Décrivez le produit..." {...register("description", { required: true })}></textarea>
                  </div>

                  <div className="col-12">
                    <label htmlFor="imageInput" className="form-label fw-bold">Ajouter 1 images à votre produit</label>
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

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary px-5">Créer article</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Aperçu à droite de la card */}
          <div className="col-lg-3">
            {[0].map((slot) => (
              <div className="card mb-3 shadow-lg" key={slot}>
                <div className="card-header text-center bg-info">Image {slot + 1}</div>
                <div className="card-body d-flex justify-content-center align-items-center" style={{ height: '250px'}}>
                  {images[slot] ? (
                    <div className="position-relative w-100">
                      <img
                        src={images[slot].preview}
                        alt={`preview-${slot}`}
                        className="img-fluid rounded"
                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
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

      {/* Menu déroulant pour mobile */}
      {activeTab === 'onlineProduct' && (
        <div className="product_online">
          {/* Bouton burger visible uniquement en mobile */}
          <div className="d-lg-none mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowMenu(prev => !prev)}
            >
              <Menu />
            </button>
          </div>

          {/* Liens : visibles si menu ouvert sur mobile OU toujours visibles sur large écran */}
          <div className={`line_conteneur ${showMenu ? 'd-flex' : 'd-none'} d-lg-flex flex-column`}>
            <h3 className='text-center text-white m-2'>Nom du Marketplace</h3>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><ArrowDownToLine className='m-2'/>Produits en ligne </a>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><Store className='m-2'/>Aperçu Marketplace </a>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><Brush className='m-2'/>Personnalisez votre page</a>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><SquarePlus className='m-2'/>Créer catégories</a>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><RectangleEllipsis className='m-2'/>Modifier produits</a>
            <a href="#" className="fw-bold p-2 text-white text-decoration-none line_product"><Radio className='m-2'/>Partager votre page</a>
            
          </div>

          {/* Liste des produits : toujours visible */}
          <div className="card shadow-lg p-4 col-lg-10 mx-auto list_product">
            <h3 className="text-center">Liste des Produits en Ligne</h3>
            
            {isLoadingProduits && <p>Chargement des produits...</p>}
            {errorProduits && <p className="text-danger">Erreur : {errorProduits}</p>}
            
            {!isLoadingProduits && produits.length === 0 && <p>Aucun produit disponible.</p>}
            
            <ul className="list-group">
              {produits.map(produit => (
                <li key={produit.id} className="list-group-item d-flex align-items-center">
                  {produit.imagePath && (
                    <img
                      src={`http://localhost:3405/uploads/${produit.imagePath}`}
                      alt={produit.designation}
                      style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '15px' }}
                    />
                  )}
                  <div>
                    <h5 className="mb-1">{produit.designation}</h5>
                    <small>{produit.description}</small><br/>
                    <strong>{produit.prix} €</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
);
}

export default ProductSeller;





