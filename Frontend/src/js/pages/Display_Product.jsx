import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DisplayProduct() {
  return (
    <div className="container my-5 p-5 bg-light rounded shadow">
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => alert('page produit  en construction !')}>Page produit</button>
      </div>
    </div>
  );
}

export default DisplayProduct;
