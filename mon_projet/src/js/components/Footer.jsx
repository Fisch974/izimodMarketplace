import React from 'react';
import '../bootstrap.js';

function Footer_page() {
    return (
        <footer className="text-white py-4 mt-auto footer">
            <div className="container text-center">
                <div className="mb-3">
                    <a href="/privacy" className="text-white mx-3 footer-link">Politique de confidentialité</a>
                    <a href="/terms" className="text-white mx-3 footer-link">Conditions d'utilisation</a>
                    <a href="/about" className="text-white mx-3 footer-link">À propos</a>
                    <a href="/contact" className="text-white mx-3 footer-link">Contact</a>
                </div>
                <p className="mb-0">&copy; {new Date().getFullYear()} Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer_page;
