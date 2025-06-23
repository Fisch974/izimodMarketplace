import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  const handleExploreStore = () => {
    // Dans votre vraie app, utilisez : navigate('/boutique');
    console.log('Navigation vers la boutique');
    navigate('/boutique'); // Redirige vers la page de la boutique
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      {/* Hero Section */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center mb-5">
              {/* Logo/Brand placeholder */}
              <div className="mb-4">
                <div className="d-inline-block p-3 rounded-circle bg-primary bg-opacity-10">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="display-4 fw-bold text-dark mb-4">
                Découvrez l'excellence
                <span className="text-primary d-block">à portée de main</span>
              </h1>

              {/* Subtitle */}
              <p className="lead text-muted mb-5 mx-auto" style={{maxWidth: '600px'}}>
                Une sélection unique de produits et services exceptionnels, choisis avec soin pour vous offrir 
                la meilleure expérience d'achat. Qualité, et innovation réunis en un seul endroit.
              </p>

              {/* CTA Button */}
              <div className="mb-5">
                <button 
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                  onClick={handleExploreStore}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Explorer la boutique
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="mb-3">
                    <div className="d-inline-block p-3 rounded-circle bg-success bg-opacity-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-success" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h5 className="fw-bold mb-2">Qualité Premium</h5>
                  <p className="text-muted small mb-0">
                    Produits sélectionnés avec expertise pour garantir une qualité irréprochable.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="mb-3">
                    <div className="d-inline-block p-3 rounded-circle bg-info bg-opacity-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-info" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h5 className="fw-bold mb-2">Service Rapide</h5>
                  <p className="text-muted small mb-0">
                    Expédition sous 24h pour une satisfaction client optimale.<br/>
                    Traitement de vos services en un temps record
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="mb-3">
                    <div className="d-inline-block p-3 rounded-circle bg-warning bg-opacity-10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-warning" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h5 className="fw-bold mb-2">Service Excellence</h5>
                  <p className="text-muted small mb-0">
                    Support client dédié pour vous accompagner à chaque étape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;