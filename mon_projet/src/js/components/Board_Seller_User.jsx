import React, { useState } from 'react';
import '../bootstrap.js';

// Données fictives par défaut (vendeur)
const initialSeller = {
  nom: 'Martin',
  prenom: 'Sophie',
  role: 'Vendeur',
  adresse: '26 rue de la joie, Batiment B, 2e Etage',
  telephone: '0692453685',
  adresseMail: 'Martin_Sophie@mail.com',
  nomMagasin: 'JardinPlus',
  motDePasse: '********'
};

// Fonction pour générer les champs selon le rôle
const getFieldsByRole = (role) => {
  const commonFields = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'motDePasse', label: 'Mot de passe' }
  ];

  if (role === 'Vendeur') {
    return [
      ...commonFields.slice(0, 4),
      { key: 'adresseMail', label: 'Mail Professionnel' },
      { key: 'nomMagasin', label: 'Nom du Magasin' },
      commonFields[4] // mot de passe
    ];
  } else {
    return [
      ...commonFields.slice(0, 4),
      { key: 'adresseMail', label: 'Adresse Mail' },
      commonFields[4] // mot de passe
    ];
  }
};

function DashboardInfoCard({
  title = 'Informations du vendeur',
  initialData = initialSeller,
}) {
  const [formData, setFormData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fields = getFieldsByRole(formData.role);

  const handleEdit = (index, key) => {
    setEditIndex(index);
    setEditValue(formData[key]);
  };

  const handleSave = (key) => {
    setFormData({ ...formData, [key]: editValue });
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="card shadow-sm carte-vendeur">
      <div className="card-body">
        <h5 className="card-title mb-4 text-center">{title}</h5>

        {fields.map((info, index) => (
          <div
            key={index}
            className="mb-4 d-flex justify-content-between align-items-center p-3"
            style={{ borderBottom: '1px solid #eee' }}
          >
            <div className="me-3 w-100">
              <strong>{info.label} :</strong>{' '}
              {editIndex === index ? (
                <input
                  type={info.key === 'motDePasse' ? 'password' : 'text'}
                  className="form-control mt-1"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className="fw-normal">
                  {info.key === 'motDePasse' ? '********' : formData[info.key]}
                </span>
              )}
            </div>

            {editIndex === index ? (
              <div className="btn-group">
                <button className="btn btn-sm btn-success" onClick={() => handleSave(info.key)}>
                  Valider
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
                  Annuler
                </button>
              </div>
            ) : (
              <button className="btn text-dark btn-sm bg-white" onClick={() => handleEdit(index, info.key)}>
                Modifier
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardInfoCard;







