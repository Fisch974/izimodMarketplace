import { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-sm fixed-top">
      <nav className="navbar navbar-expand-md container py-2">
        <a className="navbar-brand fw-bold text-primary" href="#home">
          iziMOD
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <Menu size={28} />
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Accueil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                À propos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">
                Nos services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contactez-nous
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
