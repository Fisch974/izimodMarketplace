import React from 'react';
import '../bootstrap.js';

function Search() {
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='p-5'></div>
                <div className='row row-col-6'>
                    <div className="input-group d-flex justify-content-center align-items-center" id="inputGroupSelect04">
                        <select className="form-select form-select-sm col rounded"  aria-label="select with button addon">
                            <option selected>Categorie</option>
                            <option value="1">Outillages</option>
                            <option value="2">Protections</option>
                            <option value="3">Produits de jardin</option>
                            <option value="4">Services</option>
                        </select>
                    </div>
                </div>
            </div>


            
            
        </>
    )
}

export default Search;
