import React from 'react';
import Nav from "./Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // External CSS file for custom styling
import Slider from "react-slick"; // Using react-slick for image slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../components/image1.jpeg";
import img2 from "../components/image2.jpeg";
import img3 from "../components/image3.jpeg";
function Home() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
    };

    return (
        <div>
            <Nav />
            <h1 className="display-3 text-center mt-5 " style={{color: '#007bff'}}>Welcome to Expenses Tracker Website</h1>
            <div className="container text-center mt-5">
                <Slider {...sliderSettings}>
                    <div>
                        <img src={img1} alt="slide1" />
                    </div>
                    <div>
                        <img src={img2} alt="slide2" />
                    </div>
                    <div>
                        <img src={img3} alt="slide3" />
                    </div>
                </Slider>
               
            </div>
            <section className="features-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="feature-item">
                            <div className="feature-card">
                                <i className="fas fa-receipt"></i>
                                <h3>Record Expenses</h3>
                                <p>Effortlessly record your expenses with our intuitive interface. Track your spending with ease.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-item">
                            <div className="feature-card">
                                <i className="fas fa-chart-line"></i>
                                <h3>Graphical Analysis</h3>
                                <p>Gain insights into your spending habits with our graphical analysis tools. Visualize your expenses over time and make informed decisions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-item">
                            <div className="feature-card">
                                <i className="fas fa-list"></i>
                                <h3>Expenses List</h3>
                                <p>View a detailed list of your expenses, sorted by category or date. Easily search and filter your expenses to find what you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2024 Expenses Tracker. All rights reserved.</p>
                    </div>
                    <div className="col-md-6">
                        <ul className="footer-links">
                            <li><a href="/home">Privacy Policy</a></li>
                            <li><a href="/home">Terms of Service</a></li>
                            <li><a href="/contactus">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
}

export default Home;

