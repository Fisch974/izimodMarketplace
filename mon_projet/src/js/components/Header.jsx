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
  X,
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

  const notImplemented = () => {
    alert('Fonction en cours d\'implémentation')
  }

  return (
    <>
      <header className="bg-white shadow stick-top">
        {isClicked ? "": <SubHeader />}
        <nav className="navbar navbar-expand-md container py-2">
          <div className="container-fluid d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">
              <Link to="/">
                <img src="../../data/logo/iconBlue.svg" width={64} height={64} className="me-2" alt="Logo" />
              </Link>
              <Link to="/" className="navbar-link link fw-bold fs-5 d-none d-md-block">
                iziMOD<span className="d-lg-inline d-md-none"> | VOTRE Marketplace</span>
              </Link>
            </div>

            <form className="d-flex flex-row align-items-center w-50" id="searchForm" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Rechercher..."
                aria-label="Rechercher..."
              />
              <a className="me-2 text-dark" id="searchBtn" type="submit">
                <Search />
              </a>
            </form>

            <div className="d-flex align-items-center justify-content-center">
              <button
                className="bg-white text-black border-0 d-md-none"
                onClick={toggleMenu}
                aria-label="Ouvrir le menu"
              >
                {isOpen ? <X className="mb-4" /> : <Menu className="mb-2" />}
              </button>


              <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav text-center mb-3 mb-md-0 d-md-flex flex-row gap-3 navbar-nav-scroll">
                  <li className="nav-item">
                    <a className="nav-link" href="login">
                      <User /> <span className="d-md-none">Connexion</span>
                    </a>
                  </li>
                  <li className="nav-item" onClick={notImplemented}>
                    <a className="nav-link" href="#">
                      <LogOut /> <span className="d-md-none">Déconnexion</span>
                    </a>
                  </li>
                  <li className="nav-item" onClick={toggleClick}>
                    <a className="nav-link" href="#">
                      {isClicked ? <PanelTopOpen /> : <PanelTopClose />} <span className="d-md-none">Afficher/Masquer la barre du haut</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

const SubHeader = () => {
  return <nav className="navbar bg-primary d-flex flex-md-row flex-column">
    <div className="ms-3 mb-md-0 mb-3">
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

export default Header;
