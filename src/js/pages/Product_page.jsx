import React from 'react';
import '../bootstrap.js';
import Card_product from '../components/TopSales_card.jsx';
import Middle_ReducedPrice from '../components/TopReducedPrice_card.jsx';
import ProductService from '../components/Service_product_card.jsx';
// import SelectSearch from '../components/search_product.jsx';


// Product component to display the main product page
// This component is responsible for showing the product selection and related services
function Product() {
    return (
      <>
        {/* <SelectSearch /> */}
        <ProductService />
        <Card_product />
        <Middle_ReducedPrice />
        
      </>
    )
    
}

export default Product;
