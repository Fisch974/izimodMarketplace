import React, { useState } from 'react';
import '../bootstrap.js';

const seller = {
    nom: 'Martin',
    prenom: 'Sophie',
    role: 'Vendeur',
    adresse: '26 rue de la joie, Batiment B, 2e Etage',
    telephone: '0692453685'
};

function DashBoard_Seller() {
    const [sellers] = useState(seller);

    const infos = [
        { label: 'Nom', value: sellers.nom },
        { label: 'Prénom', value: sellers.prenom },
        { label: 'Adresse', value: sellers.adresse },
        { label: 'Téléphone', value: sellers.telephone },
    ];

    return (
        <div className="card shadow-sm carte-vendeur">
            <div className="card-body">
                <h5 className="card-title mb-4 text-center">Informations du vendeur</h5>

                {infos.map((info, index) => (
                    <div
                        key={index}
                        className="mb-4 d-flex justify-content-between align-items-center"
                        style={{ paddingBottom: '8px', borderBottom: '1px solid #eee' }}
                    >
                        <div className="me-3">
                            <strong>{info.label} :</strong> <span className="fw-normal">{info.value}</span>
                        </div>
                        <button className="btn text-white btn-sm" style={{ minWidth: '90px' }}>
                            Modifier
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashBoard_Seller;




