import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import '../bootstrap.js';


// Login component to handle user authentication and redirection
// This component is responsible for rendering the login form and handling the login process
function Login(params) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    if (data.email === 'admin@local.host' && data.password === 'admin') {
      navigate('/admin/dashboard');
    }else {
      if (data.email === 'seller@local.host' && data.password === 'seller') {
        navigate('/seller/boardseller');}
      else {
        if (data.email === 'user@local.host' && data.password === 'user') {
          navigate('/users/boarduser');}}
    }
  };

  const navigate = useNavigate();

  function fonctionDeDeconnexion() {
    googleLogout()
  };

  return (
    <>
      <div className='container'>
        <div className='container-fluid row'>
          <form className='mt-5 flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
        <div className='mx-auto my-3 pt-3'><img src="../../data/logo/logoBlueSlogan.svg" width={333} height={333} /></div>
            <div className="mx-auto w-50">
            <div>
              <label for="email" className="form-label">Votre adresse mail</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...register("email", { required: true })} />
              {errors.email && <div id="emailHelp" className="form-text text-danger">Une adresse email valide est obligatoire.</div>}
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">Votre mot de passe</label>
              <input type="password" className="form-control" id="password" {...register("password")} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" for="rememberMe">Se souvenir de moi aujourd'hui</label>
            </div>
            </div>
            <div className='mx-auto'>
              <button type={"submit"} className="mb-3 btn btn-primary w-100 text-white">Se connecter avec l'adresse mail</button>
                <GoogleLogin
                  useOneTap={true}
                  context='signin'
                  ux_mode='popup'
                  shape='pill'
                  text='signin'
                  size='large'
                  locale='fr'
                  width={300}
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    navigate("/admin/dashboard");
                  }}
                  onError={() => console.log("Connexion echouée")}
                />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
