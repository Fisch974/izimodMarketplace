import '../bootstrap.js';
import React from 'react';
import Card_product from '../components/TopSales_card.jsx';
import Search from '../components/search_product.jsx';
import Middle_ReducedPrice from '../components/TopReducedPrice_card.jsx';
import ProductService from '../components/Service_product_card.jsx';

function Product() {
    return (
      <>
        <Search />
        <Card_product />
        <ProductService />
        <Middle_ReducedPrice />
        
      </>
    )
    
}

export default Product;