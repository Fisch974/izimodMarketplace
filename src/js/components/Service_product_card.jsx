import React from 'react';
import ServiceProductCard from './Service_product_card.jsx';
import tonte from '../../data/tonte.jpg';
import desherb from '../../data/desherb.jpg';
import plantation from '../../data/plantation-automne.jpg';
import taille from '../../data/taille2.jpeg';

function ProductService() {
    const services = [
        { id: 1, title: "Tonte de pelouse", description: "Service de tonte de pelouse de haute qualité.", price: 30, image: tonte },
        { id: 2, title: "Désherbage", description: "Désherbage de votre jardin pour une meilleure apparence.", price: 25, image: desherb },
        { id: 3, title: "Plantation d'arbres", description: "Planter des arbres pour embellir votre jardin.", price: 50, image: plantation },
        { id: 4, title: "Taille de haies", description: "Taille professionnelle des haies de votre jardin.", price: 40, image: taille },
    ];

    return (
        <div className=''>
            <p className='fs-3 fw-bold text-center'>Services à la carte : </p>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            
            <div className="carousel-inner">
                {services.map((service, index) => (
                    <div
                    key={service.id}
                    className={`carousel-item position-relative ${index === 0 ? 'active' : ''}`}
                    >
                    <img src={service.image} className="d-block w-100" alt={service.title} style={{ height: '350px', objectFit: 'cover' }} />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white bg-dark bg-opacity-50">
                        <h5 className="m-0">{service.title}</h5>
                        <p className="m-0">{service.description}</p>
                    </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden fleche">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden fleche">Next</span>
            </button>
        </div>

        </div>
        
    );
}

export default ProductService;
