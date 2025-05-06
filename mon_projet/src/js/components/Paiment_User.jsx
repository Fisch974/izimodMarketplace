import React, { useState } from 'react';
import '../bootstrap.js';
import { sendAlert } from './Alert_System.jsx';

function PaimentUser() {
  const [activeTab, setActiveTab] = useState('ajouter');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [savedCards, setSavedCards] = useState([]);

  const validate = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(cardData.number)) {
      newErrors.number = 'Le numéro de carte doit contenir 16 chiffres.';
    }

    if (!/^[A-Za-z\s]{2,}$/.test(cardData.name)) {
      newErrors.name = 'Le nom doit contenir au moins 2 lettres.';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Format invalide. Utilisez MM/YY.';
    }

    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Le CVV doit contenir 3 ou 4 chiffres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      sendAlert('Erreur de validation', 'Des champs du formulaire sont invalides.');
      return;
    }

    try {
      // Simuler une requête backend avec succès ou échec
      // Exemple : await axios.post('/api/cards', cardData);
      
      // Si succès :
      setSavedCards(prev => [...prev, cardData]);
      setCardData({ number: '', name: '', expiry: '', cvv: '' });
      setErrors({});
      alert('Carte enregistrée avec succès');
    } catch (err) {
      // En cas d’échec, envoyer une alerte système
      sendAlert('Erreur système', `Échec de l’enregistrement de la carte : ${err.message}`);
      alert('Une erreur est survenue lors de l’enregistrement');
    }
  };

  return (
    <div className="conteneur_paiment_user m-auto">
      <h4 className="mb-3 text-center">Paiement</h4>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'voir' ? 'active' : ''}`}
            onClick={() => setActiveTab('voir')}
          >
            Voir cartes enregistrées
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'ajouter' ? 'active' : ''}`}
            onClick={() => setActiveTab('ajouter')}
          >
            Ajouter un moyen de paiement
          </button>
        </li>
      </ul>

      {activeTab === 'ajouter' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nom sur la carte :</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={cardData.name}
              onChange={handleCardChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label>Numéro de carte :</label>
            <input
              type="text"
              className={`form-control ${errors.number ? 'is-invalid' : ''}`}
              name="number"
              value={cardData.number}
              onChange={handleCardChange}
              maxLength={16}
              inputMode="numeric"
              required
            />
            {errors.number && <div className="invalid-feedback">{errors.number}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Expiration (MM/YY) :</label>
              <input
                type="text"
                className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                required
              />
              {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>CVV :</label>
              <input
                type="text"
                className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                maxLength={4}
                inputMode="numeric"
                required
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Enregistrer la carte
          </button>
        </form>
      )}

      {activeTab === 'voir' && (
        <div>
          {savedCards.length === 0 ? (
            <p>Aucune carte enregistrée.</p>
          ) : (
            <ul className="list-group">
              {savedCards.map((card, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <div>
                    <strong>Carte :</strong> **** **** **** {card.number.slice(-4)}<br />
                    <strong>Nom :</strong> {card.name}<br />
                    <strong>Expiration :</strong> {card.expiry}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default PaimentUser;




