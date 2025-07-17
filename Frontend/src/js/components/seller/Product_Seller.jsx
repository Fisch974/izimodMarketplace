import React, { useEffect, useState } from 'react';
import '../../bootstrap.js';
import { Menu, Store, Brush, Radio, RectangleEllipsis, ArrowDownToLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import OnlineProducts from '../menu_seller/OnlineProducts.jsx';
import ProductCreate from '../menu_seller/CreateProduct.jsx';
import Create_Product from '../menu_seller/CreateProduct.jsx';

function ProductSeller() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeTab, setActiveTab] = useState('onlineProduct');
  const [images, setImages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [magasinData, setMagasinData] = useState(null);
  const [hasMagasin, setHasMagasin] = useState(false);
  const [isLoadingMagasin, setIsLoadingMagasin] = useState(true);
  const [produits, setProduits] = useState([]);
  const [isLoadingProduits, setIsLoadingProduits] = useState(false);
  const [errorProduits, setErrorProduits] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);


  const fetchProduits = async () => {
    if (!magasinData?.id) return;

    setIsLoadingProduits(true);
    setErrorProduits(null);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/produits/magasin/${magasinData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des produits');
      const data = await res.json();
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

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://localhost:3405/utilisateurs/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erreur lors de la récupération utilisateur');
        const data = await res.json();
        setUserData(data);
        if (data.id) await checkUserMagasin(data.id);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchUser();
  }, []);

  const checkUserMagasin = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:3405/magasins/check/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
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

  const handleProductDeleted = () => {
    fetchProduits(); // Recharge les produits après suppression
  };


  return (
    <div className="row">
      <div className="d-lg-none mb-3">
          <button
            className="btn btn-outline bg-dark text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu />
          </button>
        </div>
      {/* Menu à gauche */}
      <div className={`col-lg-3 ${showMenu ? '' : 'd-none d-lg-block'} bg-dark text-white p-3`}>
        
        <h3 className="text-center mb-4">Mon Marketplace</h3>
        <div className="d-flex flex-column">

          <button onClick={() => setActiveTab('onlineProduct')} className="btn btn-dark text-start mb-2">
            <ArrowDownToLine className='me-2' /> Produits en ligne
          </button>

          <button onClick={() => setActiveTab('createProduct')} className="btn btn-dark text-start mb-2">
            <Brush className='me-2' /> Créer produit ou service
          </button>
          
          <button className="btn btn-dark text-start mb-2">
            <Store className='me-2' /> Aperçu Marketplace
          </button>
          <button className="btn btn-dark text-start mb-2">
            <Radio className='me-2' /> Partager la page
          </button>
        </div>
      </div>
      {/* Contenu à droite */}
      <div className="col-lg-9">
        {activeTab === 'createProduct' && (
          <Create_Product magasinId={magasinData.id} onProductCreated={fetchProduits} />
        )}
        {activeTab === 'onlineProduct' && (
          <OnlineProducts
            produits={produits}
            magasinId={magasinData.id}
            isLoading={isLoadingProduits}
            error={errorProduits}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            onDeleteSuccess={handleProductDeleted}
          />
        )}
        

      </div>

    </div>
  );
}

export default ProductSeller;







