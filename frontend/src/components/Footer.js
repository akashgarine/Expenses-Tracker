import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2024 Expenses Tracker. All rights reserved.</p>
                    </div>
                    <div className="col-md-6">
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#userlogin">Login</a></li>
                            <li><a href="#usersignup">Signup</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
    