import React from 'react';
// Importing the icons from Lucide Icons
import {
    ArrowLeftCircle,
    ArrowRightCircle
} from 'lucide-react';

// Importing the images
import desherb from '../../data/slider/desherb.jpg';
import entretien from '../../data/slider/produit-entretien.jpg';
import plantation from '../../data/slider/plantation-automne.jpg';
import taille from '../../data/slider/taille2.jpeg';
import tonte from '../../data/slider/tonte.jpg';

// import ServiceProductCard from './Service_product_card.jsx';
// import { color } from 'chart.js/helpers';


// ProductService component to display a carousel of services
// This component is responsible for showing the services available for selection
function ProductService() {
    const services = [
        { id: 1, title: "Nos services, sur mesure, pour vous.", description: "Spécialiste du nettoyage haute pression depuis 30 ans.", price: 799, image: entretien },
        { id: 2, title: "Tonte de pelouse", description: "Service de tonte de pelouse de haute qualité.", price: 30, image: tonte },
        { id: 3, title: "Désherbage", description: "Désherbage de votre jardin pour une meilleure apparence.", price: 25, image: desherb },
        { id: 4, title: "Plantation d'arbres", description: "Planter des arbres pour embellir votre jardin.", price: 50, image: plantation },
        { id: 5, title: "Taille de haies", description: "Taille professionnelle des haies de votre jardin.", price: 40, image: taille },
    ];

    return (
        <div id='sliderServices' className='bg-dark-subtle rounded-bottom-5 p-5 mb-5 mx-5 position-relative'>
            {/* <p className='fs-3 fw-bold text-center'>Services à la carte : </p> */}
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner mb-5">
                    {services.map((service, index) => (
                        <div
                        key={service.id}
                        className={`carousel-item position-relative ${index === 0 ? 'active' : ''}`}
                        >
                            <img src={service.image} className="d-block w-100" alt={service.title} style={{ height: '350px', objectFit: 'cover' }} />
                            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white bg-dark bg-opacity-50">
                                <h5 className="">{service.title}</h5>
                                <p className="mb-0">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                    <NavigationButtons />
            </div>
            <CardGuarantee />
        </div>
    );
}

const NavigationButtons = () => {
    return <>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
            <ArrowLeftCircle size={40} />
            <span className="visually-hidden fleche">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            {/* <span className="carousel-control-next-icon" aria-hidden="true">
            </span> */}
            <ArrowRightCircle size={40} />
            <span className="visually-hidden fleche">Suivant</span>
        </button>
    </>
}

const CardGuarantee = () => {
    return <div className="position-absolute top-100 start-50 translate-middle w-100 pb-3">
        <div id='guaranteeImages' className="container bg-light w-75 mt-5 pt-3 pb-1 d-flex flex-md-row flex-column justify-content-around text-center text-primary fw-light rounded-3 mx-auto shadow">
            <div>
                <img src="../../data/icons/delivery-truck.svg" alt="garantie1" className='mb-2' width={64} height={64} />
                <p>Livraison rapide</p>
            </div>
            <div>
                <img src="../../data/icons/24-hours.svg" alt="garantie2" className='mb-2' width={64} height={64} />
                <p>Support 24/7</p>
            </div>
            <div>
                <img src="../../data/icons/shield.svg" alt="garantie3" className='mb-2' width={64} height={64} />
                <p>Paiement sécurisé</p>
            </div>
        </div>
    </div>;
}

export default ProductService;
