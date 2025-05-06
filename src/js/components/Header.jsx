import { Link } from "react-router-dom";
import { useState } from "react";
// Librairie d'icônes
import {
  CheckCheck,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  PanelTopClose,
  Search,
  User,
  XCircle,
  PanelTopOpen
} from "lucide-react";

const Header = () => {
  // useState pour gérer l'état (ouvert/fermé) du menu
  const [isOpen, setIsOpen] = useState(false);
  // Fonction fléchée qui altère l'état du menu (du useState)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  // Trigger l'icône pour affichage ou non de la deuxième
  const [isClicked, setIsClicked] = useState(false);
  // Fonction fléchée qui altère l'état du menu (du useState)
  const toggleClick = () => {
    setIsClicked(!isClicked);
  }
  
  const shopOwner = "Fisch";

  return (
    <>
      <header className="bg-dark-subtle shadow stick-top">
        {isClicked ? "": <SupHeader />}
        <nav className="navbar navbar-expand-md container p-3">
          <div className="container-fluid d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">
              <Link to="/">
                <img src="../../data/logo/iconBlue.svg" width={64} height={64} className="me-3" alt="Logo" />
              </Link>
              <Link to="/" className="navbar-link link fw-bold fs-5 d-none d-md-block text-decoration-none">
                iziMOD<span className="d-lg-inline d-md-none"> | {shopOwner}'s place</span>
              </Link>
            </div>

            <form className="d-flex flex-row align-items-center w-50" id="searchForm" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Rechercher..."
                aria-label="Rechercher..."
              />
              <a className="me-2" id="searchBtn" type="submit">
                <Search />
              </a>
            </form>

            <div className="d-flex align-items-center justify-content-center">
              <button
                className="bg-transparent text-black border-0 d-md-none"
                onClick={toggleMenu}
                aria-label="Ouvrir le menu"
              >
                {isOpen ? <XCircle className="mb-4" /> : <Menu className="mb-2" />}
              </button>


              <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav text-center mb-3 mb-md-0 d-md-flex flex-md-row flex-column gap-3 navbar-nav-scroll">
                  <li className="nav-item me-auto">
                    <a className="nav-link text-primary btn btn-transparent shadow-md" href="login">
                      <User /> <span className="d-md-none">Connexion</span>
                    </a>
                  </li>
                  <li className="nav-item me-auto" onClick={notImplemented}>
                    <a className="nav-link text-primary btn btn-transparent shadow-md" href="#">
                      <LogOut /> <span className="d-md-none">Déconnexion</span>
                    </a>
                  </li>
                  <li className="nav-item me-auto" onClick={toggleClick}>
                    <a className="nav-link text-primary btn btn-transparent shadow-md" href="#">
                      {isClicked ? <PanelTopOpen /> : <PanelTopClose />} <span className="d-md-none">Afficher/Masquer la barre du haut</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <SubHeader />
      </header>
    </>
  );
}

const SupHeader = () => {
  return <nav className="navbar bg-primary d-flex flex-md-row flex-column justify-content-around" onClick={notImplemented}>
    <div className="mb-md-0 mb-3">
      <span className="navbar-text text-light">
        <CheckCheck /> Livraison offerte à partir de 120 €
      </span>
    </div>
    <div className="d-flex flex-md-row flex-column me-3 gap-3 text-light">
      <div>
        🇫🇷 &nbsp; Français <ChevronDown />
      </div>
      <div>
        Besoin d'aide <HelpCircle />
      </div>
    </div>
  </nav>
}

const SubHeader = () => {
  return <nav className="navbar bg-light d-flex flex-md-row flex-column justify-content-around align-items-center">
    <div className="mb-md-0 mb-3 d-flex align-items-center gap-3">
      <button className="btn btn-light shadow mb-3 text-primary">
        <Menu size={20} className="me-1" /> Catégories
      </button>
      <Link className="text-decoration-none menuLink" to="/" aria-selected="true">Accueil</Link>
      <Link className="text-decoration-none menuLink text-black-50" to="login" aria-selected="false">Boutique</Link>
      <Link className="text-decoration-none menuLink text-black-50" to="login" aria-selected="false">Produits</Link>
      <Link className="text-decoration-none menuLink text-black-50" to="https://github.com/Fisch974/izimodMarketplace/tree/develop" target="_blank" aria-selected="false">À propos</Link>
    </div>
    <div className="d-flex flex-md-row flex-column me-3 gap-3">
      <div>
        Contact : <span className="text-primary">(692) 123 123</span>
      </div>
    </div>
  </nav>
}

export default Header;
