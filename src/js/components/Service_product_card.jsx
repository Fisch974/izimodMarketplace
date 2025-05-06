import React from 'react';
import ServiceProductCard from './Service_product_card.jsx';
import tonte from '../../data/tonte.jpg';
import desherb from '../../data/desherb.jpg';
import plantation from '../../data/plantation-automne.jpg';
import taille from '../../data/taille2.jpeg';


// ProductService component to display a carousel of services
// This component is responsible for showing the services available for selection
function ProductService() {
    const services = [
        { id: 1, title: "Tonte de pelouse", description: "Service de tonte de pelouse de haute qualité.", price: 30, image: tonte },
        { id: 2, title: "Désherbage", description: "Désherbage de votre jardin pour une meilleure apparence.", price: 25, image: desherb },
        { id: 3, title: "Plantation d'arbres", description: "Planter des arbres pour embellir votre jardin.", price: 50, image: plantation },
        { id: 4, title: "Taille de haies", description: "Taille professionnelle des haies de votre jardin.", price: 40, image: taille },
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
                                <h5 className="m-0">{service.title}</h5>
                                <p className="m-//0">{service.description}</p>
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
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden fleche">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden fleche">Next</span>
        </button>
    </>
}

const CardGuarantee = () => {
    return <div className="position-absolute top-100 start-50 translate-middle w-100 pb-5">
        {/* <div className="p-1"></div> */}
        <div id='guaranteeImages' className="container bg-light w-75 mt-5 pt-3 pb-1 d-flex flex-md-row flex-column justify-content-around text-center text-primary fw-lighter rounded-3 mx-auto">
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
