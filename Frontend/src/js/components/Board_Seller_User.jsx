import React, { useState } from 'react';
import '../bootstrap.js';
import '../../scss/_root.scss';

function DashboardInfoCard({ title = '', initialData = {}, fields = [], onSave }) {
  const [formData, setFormData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [background, setBackground] = useState({
    backgroundColor: 'var(--background-blue)',
    color: 'white'
  });

  const handleEdit = (index, key) => {
    setEditIndex(index);
    setEditValue(formData[key]);
  };

  const handleSave = async (key) => {
    const updatedData = { ...formData, [key]: editValue };
    setFormData(updatedData);
    setEditIndex(null);
    if (onSave) {
      try {
        await onSave(updatedData);
      } catch (err) {
        console.error("Erreur de mise à jour:", err);
        alert("Échec de la mise à jour.");
      }
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <>
      {/* Choix des couleurs */}
      <div className="mb-3">
        <p className="align-items-center m-1">Personnaliser la couleur de votre interface :</p>
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

      {/* Carte des infos */}
      <div className="card carte-vendeur mb-5 m-auto p-5" style={background}>
        <h5 className="card-title text-center p-4 fw-bold">
          {title} {formData.nom} {formData.prenom}
        </h5>

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












