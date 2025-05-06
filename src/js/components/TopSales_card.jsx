import React from 'react';
import '../bootstrap.js';
import gant from '../../data/gants.jpg';
import img_pelle from '../../data/Mini-pelle.jpeg';
import rateau from '../../data/rateau.jpg';

// Card_product component to display a section with top-selling products
// This component is responsible for showing a selection of products that are popular among customers
const products = [
  {
    id: 1,
    name: "Mini-Pelle de jardin",
    price: 49.99,
    image: img_pelle,
  },
  {
    id: 2,
    name: "Rateau inoxidable",
    price: 89.99,
    image: rateau,
  },
  {
    id: 3,
    name: "Gant Multitâches",
    price: 29.99,
    image: gant,
  },
];


// This component is responsible for displaying a section with top-selling products
// It includes a title and a grid of product cards representing the products
function Card_product() {
  return (
    <div>
      <p className='fw-bold fs-3 text-center'>Top ventes :</p>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} €</p>
            <button className='btn rounded-2 button-panier'>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Card_product;
