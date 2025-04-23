import React from 'react';
import '../bootstrap.js';

function Search(params) {
    return (
        <>
            <div className='container mt-4'>
                <div className='row '>
                    <div className="input-group d-flex  justify-content-center d">
                        <select className="form-select col-6 rounded" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option selected>Categorie</option>
                            <option value="1">Outillages</option>
                            <option value="2">Protections</option>
                            <option value="3">Produits de jardin</option>
                        </select>
                        <button className="btn col-4 col-md-2 button-search mx-2" type="button">Recherche</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;
