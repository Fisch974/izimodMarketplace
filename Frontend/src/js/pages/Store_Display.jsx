import React, { useState } from 'react';
import '../bootstrap.js';
import Card_product from '../components/seller/TopSales_card.jsx';
import Middle_ReducedPrice from '../components/seller/TopReducedPrice_card.jsx';
import ProductService from '../components/seller/Service_product_card.jsx';
// import SelectSearch from '../components/search_product.jsx';


// Product component to display the main product page
// This component is responsible for showing the product selection and related services
function Store() {

    return (
      <>
        <ProductService />
        <Card_product />
        <Middle_ReducedPrice />
        
      </>
    )
    
}

export default Store;
