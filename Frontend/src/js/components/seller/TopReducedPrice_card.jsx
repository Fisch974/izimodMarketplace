import React from 'react';
import '../../bootstrap.js';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Importing images
import complet_kit from '../../../data/comple-kit.jpg';
import ensemble1 from '../../../data/ensemble1.jpg';
import kit_6 from '../../../data/kit-6-outils.jpg';
import kit7 from '../../../data/kit7.jpeg';
import set_3 from '../../../data/set-3-outils.jpg';

// Middle_ReducedPrice component to display a section with reduced price products
// This component is responsible for showing a selection of products with reduced prices
const productImages = [
  { id: 1, src: complet_kit, name: "Chaussures" },
  { id: 2, src: ensemble1, name: "Montre" },
  { id: 3, src: kit_6, name: "Écouteurs" },
  { id: 4, src: kit7, name: "Écouteurs" },
  { id: 5, src: set_3, name: "Écouteurs" },
];


// This component is responsible for displaying a section with reduced price products
// It includes a title and a grid of images representing the products
function Middle_ReducedPrice() {
  const ifSales = true;

  if (productImages.length > 0) {
    return (
      <div className='pt-md-5 py-5'>
        <div className="d-flex justify-content-around align-items-center pt-md-3 pb-5">
          <div className='fw-bold fs-3'>💖 Nos produits soldés 💖</div>
        </div>

        <div className="cardProducts mx-5 ps-5">
          {productImages.map((img) => (
            <div className="cardProduct container g-0 rounded-bottom-3" key={img.id}>
              <div className="img-fluid rounded-top-3 d-flex flex-column mb-2">
                <img className='' src={img.src} alt={'Acheter ' + img.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='pt-md-5 pt-3'>
        <div className="d-flex justify-content-around align-items-center pt-md-5 pb-5">
          <div className='fw-bold fs-3'>
            Ancun produit en promotion, revenez vite 😉
          </div>
        </div>
      </div>
    )
  };
}

export default Middle_ReducedPrice;
