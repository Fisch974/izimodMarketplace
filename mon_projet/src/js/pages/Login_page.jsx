import '../bootstrap.js';
import React from 'react';


function Login(params) {
  return (
    <>
      <form className='container mt-5'>
        <div className="my-5 pt-5">
          <label for="exampleInputEmail1" className="form-label">Votre adresse mail</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">Entrez une adresse mail valide.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Votre mot de passe</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Se souvenir de moi aujourd'hui</label>
        </div>
        <button type="submit" className="btn btn-primary w-100 text-white">CONNEXION</button>
      </form>
    </>
  )
}



export default Login;
