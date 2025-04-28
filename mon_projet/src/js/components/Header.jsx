import { useState } from "react";
// Librairie d'icônes
import {
  LogOut,
  Menu,
  PanelTopClose,
  PanelBottomOpen,
  User,
  X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  // useState pour gérer l'état (ouvert/fermé) du menu
  const [isOpen, setIsOpen] = useState(false);
  // 
  const [switchIcon, setSwitchIcon] = useState(false);
  // Fonction fléchée qui altère l'état du menu (du useState)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSwitchIcon(!switchIcon);
  }

  const notImplemented = () => {
    alert('Fonction en cours d\'implémentation')
  }

  return (
    <header className="bg-white shadow fixed-top">
      <nav className="navbar navbar-expand-md container py-2">
        <Link to="/"><img src="../../data/logo/iconBlue.svg" width={64} height={64} className="ms-3" /></Link>
        <Link to='/' className="navbar-link link fw-bold fs-5 ms-md-3 d-md-block d-none">
          iziMOD | VOTRE Marketplace
        </Link>

        <button
          className="bg-white me-3 text-black border-0 mb-3 d-md-none"
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
        >
          <span className="d-md-none">
            {switchIcon && isOpen ? <X /> : <Menu />}
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-md-auto me-3 ms-3 mb-3 mb-md-0">
            <li className="navbar-brand my-3">
                <Link to="/" className="navbar-link link d-md-none fw-bold">iziMOD | VOTRE Marketplace</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login">
                < User /> <span className="d-md-none">Connexion</span>
              </a>
            </li>
            <li className="nav-item" onClick={notImplemented}>
              <a className="nav-link" href="#">
                <LogOut /> <span className="d-md-none">Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
