import '../bootstrap.js';
import React from 'react';
import complet_kit from '../../data/comple-kit.jpg';
import ensemble1 from '../../data/ensemble1.jpg';
import kit_6 from '../../data/kit-6-outils.jpg';
import kit7 from '../../data/kit7.jpeg';
import set_3 from '../../data/set-3-outils.jpg';

// Simulate backend
const productImages = [
    { id: 1, src: complet_kit, name: "Chaussures" },
    { id: 2, src: ensemble1, name: "Montre" },
    { id: 3, src: kit_6, name: "Écouteurs" },
    { id: 4, src: kit7, name: "Écouteurs" },
    { id: 5, src: set_3, name: "Écouteurs" },
  ];

function Middle_ReducedPrice(params) {
    return (
        <div className="big-card">
          <h2>Nos prix réduit 💖</h2>
          <div className="big-card-images">
            {productImages.map((img) => (
                <img src={img.src} alt={img.name} className="big-card-image" />

            ))}
          </div>
        </div>
      );
}


export default Middle_ReducedPrice;