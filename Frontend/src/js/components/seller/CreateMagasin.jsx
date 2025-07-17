// Exemple: CreerMagasin.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function CreerMagasin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
        const token = localStorage.getItem("access_token"); // si besoin d’un token
      // ⚠️ Assure-toi que l'utilisateur a bien été stocké après l'inscription
        const utilisateurId = localStorage.getItem("utilisateur_id"); // ou autre clé si différente

        if (!utilisateurId) {
        throw new Error("ID utilisateur introuvable, veuillez vous reconnecter.");
        }
        const res = await fetch("http://localhost:3405/magasins/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify({
            nom: data.nom,
            telephone: data.telephone,
            creerLe: new Date().toISOString().split("T")[0],
            utilisateurId: Number(utilisateurId)
            })
      });

      if (!res.ok) throw new Error("Erreur création magasin");
      alert("✅ Magasin créé avec succès !");
      navigate("boardseller"); 

    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer votre magasin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <div>
          <label htmlFor="nom" className="form-label">Nom du magasin :</label>
          <input id="nom" className="form-control" {...register("nom", { required: true })} />
          {errors.nom && <div className="text-danger">Nom requis</div>}
        </div>
        <div>
            <label htmlFor='telephone' className='form-label'>Téléphone :</label>
            <input id='telephone' className='form-control' {...register("telephone", {required: true })} />
            {errors.telephone && <div className='text-danger'>Téléphone requis</div>}
        </div>

        <button type="submit" className="btn btn-success mt-3 w-100">Créer le magasin</button>
      </form>
    </div>
  );
}

export default CreerMagasin;


