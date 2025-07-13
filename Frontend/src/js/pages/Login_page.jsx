import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import '../bootstrap.js';
import RoleSelector from '../components/Select_Role.jsx';
import Formulaire from '../components/Form_Registration.jsx'
import { Link } from 'react-router-dom';


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [googleData, setGoogleData] = useState(null); // id_token Google
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3405/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: data.email, motDePasse: data.password }),
      });

      if (!response.ok) throw new Error('Identifiants invalides');
      const result = await response.json();
      localStorage.setItem('access_token', result.access_token);

      const role = result.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'vendeur') navigate('/seller/boardseller');
      else if (role === 'utilisateur') navigate('/users/boarduser');
      else navigate('/');
    } catch (error) {
      alert(error.message || 'Erreur lors de la connexion');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      setGoogleData(credentialResponse); // Pour le register plus tard

      const response = await fetch('http://localhost:3405/auth/google/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      if (result.needRole) {
        // L'utilisateur n'existe pas encore → demander le rôle
        setShowRoleSelector(true);
      } else {
        // L'utilisateur existe déjà → on connecte
        localStorage.setItem('access_token', result.access_token);
        const role = result.user.role;
        if (role === 'vendeur') navigate('/seller/boardseller');
        else navigate('/users/boarduser');
      }
    } catch (error) {
      console.error("Erreur Google Login:", error);
      alert("Échec de connexion avec Google");
    }
  };

  const handleRoleSelect = async (role) => {
    try {
      const res = await fetch('http://localhost:3405/auth/google/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: googleData.credential,
          role
        }),
      });

      const result = await res.json();
      localStorage.setItem('access_token', result.access_token);

      if (!result.user || !result.user.role) {
        throw new Error("Utilisateur ou rôle manquant dans la réponse");
      }

      if (result.user.role === 'vendeur') navigate('/seller/boardseller');
      else navigate('/users/boarduser');
    } catch (err) {
      alert("Erreur lors de l'enregistrement Google");
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <div className='container-fluid row'>
        <form className='mt-5 flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
          <div className='mx-auto my-3 pt-3'>
            <img src="../../data/logo/logoBlueSlogan.svg" width={333} height={333} alt="Logo" />
          </div>
          <div className="mx-auto w-50">
            <div>
              <label htmlFor="email" className="form-label">Votre adresse mail</label>
              <input type="email" className="form-control" id="email" {...register("email", { required: true })} />
              {errors.email && <div className="form-text text-danger">Une adresse email valide est obligatoire.</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Votre mot de passe</label>
              <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
              {errors.password && <div className="form-text text-danger">Le mot de passe est obligatoire.</div>}
            </div>
            <div className="mb-3 form-check d-flex justify-content-center">
              <Link to="/form" className='fs-4'>
                  Inscrivez Vous !
              </Link>
            </div>
          </div>
          <div className='mx-auto'>
            <button type="submit" className="mb-3 btn btn-primary w-100 text-white">Connexion</button>
            <GoogleLogin
              useOneTap={true}
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Connexion échouée")}
            />
          </div>
        </form>

        {/* Select role */}
        {showRoleSelector && googleData && (
          <RoleSelector onSelect={handleRoleSelect} />
        )}
      </div>
    </div>
  );
}

export default Login;



