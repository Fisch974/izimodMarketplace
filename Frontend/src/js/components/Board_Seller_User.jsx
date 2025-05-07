import React, { useState } from 'react';
import '../bootstrap.js';
import '../../scss/_root.scss';


// DashboardInfoCard component to display and manage seller information
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

// Function to get fields based on user role
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
      commonFields[4]
    ];
  } else {
    return [
      ...commonFields.slice(0, 4),
      { key: 'adresseMail', label: 'Adresse Mail' },
      commonFields[4]
    ];
  }
};


// Main component to display the seller's information card
// This component is responsible for showing the seller's information and allowing editing of the fields
// It also allows the user to customize the background color of the card
function DashboardInfoCard({ title = 'COMPTE VENDEUR: ', initialData = initialSeller }) {
  const [formData, setFormData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [background, setBackground] = useState({
    backgroundColor: 'var(--background-blue)',
    color: 'white'
  });
  

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
    <>
      {/* Choice Colors */}
      <div className="mb-3">
        <p className='align-items-center m-1'>Personnaliser la couleur de votre interface :</p>
        {[
          { var: '--background-blue', text: 'white' },
          { var: '--background-green', text: 'white' },
          { var: '--background-orange', text: 'black' },
          { var: '--background-red', text: 'white' },
          { var: '--background-grey', text: 'white' },
          { var: '--background-marron', text: 'white' },
          { var: '--background-white', text: 'black' }
        ].map((theme, idx) => (
          <button
            key={idx}
            className="btn btn-sm rounded-circle border mx-1 mb-2"
            style={{
              backgroundColor: `var(${theme.var})`,
              color: theme.text,
              width: '20px',
              height: '20px'
            }}
            title={`Fond ${theme.var}`}
            onClick={() =>
              setBackground({
                backgroundColor: `var(${theme.var})`,
                color: theme.text
              })
            }
          />
        ))}
      </div>

      {/* Card */}
      <div className="card carte-vendeur mb-5 m-auto p-5" style={background}>
        <h5 className="card-title text-center p-4 fw-bold">
          {title} {formData.nom} {formData.prenom}
        </h5>

        {/*Display card */}
        {Array.from({ length: Math.ceil(fields.length / 2) }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[0, 1].map((offset) => {
              const index = rowIndex * 2 + offset;
              const info = fields[index];
              if (!info) return null;

              return (
                <div key={index} className="col-md-6 p-3 border-bottom">
                  <strong>{info.label} :</strong>{' '}
                  {editIndex === index ? (
                    <>
                      <input
                        type={info.key === 'motDePasse' ? 'password' : 'text'}
                        className="form-control mt-1"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <div className="btn-group mt-2">
                        <button className="btn btn-sm btn-success" onClick={() => handleSave(info.key)}>Valider</button>
                        <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Annuler</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="fw-normal">
                        {info.key === 'motDePasse' ? '********' : formData[info.key]}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-dark mt-2 ms-2 text-white bg-primary d-flex"
                        onClick={() => handleEdit(index, info.key)}
                      >
                        Modifier
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardInfoCard;










