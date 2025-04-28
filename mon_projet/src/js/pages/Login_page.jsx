import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import '../bootstrap.js';

function Login(params) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    if (data.email === 'admin@local.host' && data.password === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  const navigate = useNavigate();

  function fonctionDeDeconnexion() {
    googleLogout()
  };

  return (
    <>
      <form className='container mt-5 flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 pt-5">
          <label for="exampleInputEmail1" className="form-label">Votre adresse mail</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("email", { required: true })} />
          {errors.email && <div id="emailHelp" className="form-text text-danger">Une adresse email valide est obligatoire.</div>}
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Votre mot de passe</label>
          <input type="password" className="form-control" id="exampleInputPassword1" {...register("password")} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Se souvenir de moi aujourd'hui</label>
        </div>
        <button type={"submit"} className="mb-3 btn btn-primary w-100 text-white">CONNEXION</button>

        <GoogleLogin
          useOneTap={true}
          context='signin'
          ux_mode='popup'
          shape='pill'
          text='signin'
          size='large'
          locale='fr'
          width={999}
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            navigate("/admin/dashboard");
          }}
          onError={() => console.log("Connexion echouée")}
        />

      </form>
    </>
  )
}

export default Login;
