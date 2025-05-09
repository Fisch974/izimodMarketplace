import React from 'react';
import {
  // ArrowLeft,
  // ArrowRight,
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
  const ifSales = false;

  if (products.length > 0) {
    return (
      <div className='pt-md-5 pt-3'>
        <div className="d-flex justify-content-around align-items-center pt-md-5 pb-5">
          <div className='fw-bold fs-3'>✨ Nos produits phares ✨</div>
          {/* <div className='mb-2'>
          <button className='btn btn-outline-primary border-1 rounded-pill me-2'>
            <ArrowLeft />
          </button>
          <button className='btn btn-outline-primary border-1 rounded-pill'>
            <ArrowRight />
          </button>
        </div> */}
        </div>

        <div className="cardProducts mx-5 ps-5">
          {products.map((product) => (
            <div className="cardProduct container g-0 rounded-bottom-3" key={product.id}>
              <div className="d-flex flex-column mb-2">
                <img className='img-fluid rounded-top-3' src={product.image} alt={'Acheter ' + product.name} />
              </div>
              <div className="hstack">
                <div className="">
                  <div className="">
                    <p className="fs-6 fw-lighter text-primary">
                      {product.name}
                    </p>
                    <p className="fw-bold">
                      {product.price} €
                      {ifSales && <span className="fw-lighter text-decoration-line-through text-black-50"> {product.price * 2} €</span>}
                    </p>
                  </div>
                </div>
                <div className="mb-4 me-lg-5 ms-auto">
                  <button className="btn btn-outline-primary rounded-3">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={'Acheter ' + product.name} />
            <div>
              <p className='text-primary fw-light'>{product.name}</p>
              <p className='fw-bold'>{product.price} €</p>
            </div>
            <button className='btn btn-outline-primary rounded-3 button-panie'>
              <ShoppingCart />
            </button>
          </div>
        ))}
      </div> */}
      </div>
    )
  } else {
    return (
      <div className='pt-md-5 pt-3'>
        <div className="d-flex justify-content-around align-items-center pt-md-5 pb-5">
          <div className='fw-bold fs-3'>
            C'est bien vide ici, ajoutez des article 😉
          </div>
        </div>
      </div>
    )
  };
}

export default Card_product;
