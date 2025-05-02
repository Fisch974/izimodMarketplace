import React, { useState } from 'react';
import '../bootstrap.js';

const dummyPurchases = Array.from({ length: 23 }).map((_, index) => ({
  id: index + 1,
  produit: `Produit ${index + 1}`,
  magasin: `Magasin ${index % 3 === 0 ? 'JardinPlus' : index % 3 === 1 ? 'TechGarden' : 'NatureShop'}`,
  date: `2025-04-${(index % 30 + 1).toString().padStart(2, '0')}`,
  prix: (Math.random() * 100).toFixed(2),
}));

function PurchaseUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 10;

  const totalPages = Math.ceil(dummyPurchases.length / purchasesPerPage);
  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = dummyPurchases.slice(indexOfFirstPurchase, indexOfLastPurchase);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="conteneur_product container-fluid">
      <h4 className="mb-4 text-center">Mes Achats</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Produit</th>
              <th>Magasin</th>
              <th>Date d'achat</th>
              <th>Prix (€)</th>
            </tr>
          </thead>
          <tbody>
            {currentPurchases.map((item) => (
              <tr key={item.id}>
                <td>{item.produit}</td>
                <td>{item.magasin}</td>
                <td>{new Date(item.date).toLocaleDateString('fr-FR')}</td>
                <td>{parseFloat(item.prix).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default PurchaseUser;

