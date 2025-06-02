import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RoleSelector from './Select_Role.jsx';

function Formulaire() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [message, setMessage] = useState('');

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
          mail: data.email,
          motDePasse: data.password,
          role: selectedRole
        })
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Erreur lors de l\'inscription');

      setMessage("✅ Utilisateur inscrit avec succès !");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input id="nom" className="form-control" {...register("nom", { required: true })} />
          {errors.nom && <div className="text-danger">Nom requis</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénom</label>
          <input id="prenom" className="form-control" {...register("prenom", { required: true })} />
          {errors.prenom && <div className="text-danger">Prénom requis</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">Adresse</label>
          <input id="adresse" className="form-control" {...register("adresse", { required: true })} />
          {errors.prenom && <div className="text-danger">Adresse requis</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Email</label>
          <input type="mail" id="mail" className="form-control" {...register("mail", { required: true })} />
          {errors.mail && <div className="text-danger">Email requis</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input type="password" id="password" className="form-control" {...register("password", { required: true, minLength: 6 })} />
          {errors.password && <div className="text-danger">Mot de passe (min 6 caractères) requis</div>}
        </div>

        <RoleSelector onSelect={setSelectedRole} />

        <button type="submit" className="btn btn-primary mt-3 w-100">Créer le compte</button>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form>
    </div>
  );
}

export default Formulaire;
