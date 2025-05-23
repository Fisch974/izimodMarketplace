import { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-sm fixed-top">
      <nav className="navbar navbar-expand-md container py-2">
        <img src="../../data/logo/iconBlue.svg" width={64} height={64} className="ms-5" />
        <Link to='/' className="navbar-link link fw-bold fs-5 text-primary ms-3">
          iziMOD | VOTRE Marketplace
        </Link>

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

        <div className={`collapse navbar-collapse ${isOpen ? "show" : "login"}`}>
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link" href="login">
                < User />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <LogOut />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
