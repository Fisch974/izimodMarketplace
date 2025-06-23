import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RoleSelector from './Select_Role.jsx';
import { useNavigate } from 'react-router-dom';

function Formulaire() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [message, setMessage] = useState('');
  const [registered, setRegistered] = useState(false); // flag inscription réussie
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!selectedRole) {
      setMessage("Veuillez sélectionner un rôle.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3405/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: data.nom,
          prenom: data.prenom,
          adresse: data.adresse,
          mail: data.mail,
          motDePasse: data.password,
          role: selectedRole
        })
      });

      const result = await response.json();
      if (result.user?.id) {
        localStorage.setItem("utilisateur_id", result.user.id);
      }


      if (!response.ok) throw new Error(result.message || 'Erreur lors de l\'inscription');

      setMessage("✅ Utilisateur inscrit avec succès ! Vous allez être redirigé vers la page de connexion.");
      setRegistered(true); // on affiche le message seul

      setTimeout(() => {
        if (result.user && result.user.role === 'vendeur') {
          navigate("/creer-magasin"); // rediriger vers la création de magasin
        } else {
          navigate("/login");
        }
      }, 8000);

    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  if (registered) {
    return (
      <div 
        className="container mt-5 d-flex justify-content-center align-items-center" 
        style={{ height: '100vh', flexDirection: 'column' }}
      >
        <div className="alert alert-success text-center" style={{ fontSize: '1.5rem' }}>
          {message}
        </div>
      </div>
    );
  }

  // Formulaire affiché tant que non inscrit
  return (
    <div className="container mt-5">
      <h2>Créer votre compte utilisateur</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div>
          <label htmlFor="nom" className="form-label">Nom:</label>
          <input id="nom" className="form-control" {...register("nom", { required: true })} />
          {errors.nom && <div className="text-danger">Nom requis</div>}
        </div>

        <div>
          <label htmlFor="prenom" className="form-label">Prénom:</label>
          <input id="prenom" className="form-control" {...register("prenom", { required: true })} />
          {errors.prenom && <div className="text-danger">Prénom requis</div>}
        </div>

        <div>
          <label htmlFor="adresse" className="form-label">Adresse:</label>
          <input id="adresse" className="form-control" {...register("adresse", { required: true })} />
          {errors.adresse && <div className="text-danger">Adresse requise</div>}
        </div>

        <div>
          <label htmlFor="mail" className="form-label">Email:</label>
          <input
            type="email"
            id="mail"
            className="form-control"
            {...register("mail", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Adresse email invalide"
              }
            })}
          />
          {errors.mail && <div className="text-danger">{errors.mail.message || "Email requis"}</div>}

        </div>

        <div>
          <label htmlFor="password" className="form-label">Mot de passe:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Le mot de passe doit contenir au moins une lettre et un chiffre",
              },
            })}
          />
          {errors.password && <div className="text-danger">{errors.password.message || "Mot de passe requis"}</div>}

        </div>

        <RoleSelector onSelect={setSelectedRole} />

        <button type="submit" className="btn btn-primary mt-3 w-100">Créer le compte</button>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form>
    </div>
  );
}

export default Formulaire;



