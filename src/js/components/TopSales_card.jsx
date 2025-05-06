import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
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
  {
    id: 4,
    name: "Mini-Pelle de jardin",
    price: 49.99,
    image: img_pelle,
  }
];


// This component is responsible for displaying a section with top-selling products
// It includes a title and a grid of product cards representing the products
function Card_product() {
  return (
    <div className='pt-5'>
      <div className="d-flex justify-content-around pt-5">
        <p className='fw-bold fs-3 text-center'>Nos produits les plus appréciés :</p>
        <div>
          <button className='btn btn-outline-primary border-1 rounded-pill me-2'>
            <ArrowLeft />
          </button>
          <button className='btn btn-outline-primary border-1 rounded-pill'>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={'A' + product.name} />
            <div>
              <p className='text-primary fw-light'>{product.name}</p>
              <p className='fw-bold'>{product.price} €</p>
            </div>
            <button className='btn btn-outline-primary rounded-3 button-panie'>
              <ShoppingCart />
            </button>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Card_product;
