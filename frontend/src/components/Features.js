import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Features() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section id="features" className="features-section">
            <div className="container">
                <h2 className="text-center">Features</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="feature-item" onClick={handleShow}>
                            <i className="fas fa-receipt fa-3x mb-3"></i>
                            <h3>Record Expenses</h3>
                            <p>Effortlessly record your expenses with our intuitive interface. Categorize and track your spending with ease.</p>
                        </div>
                    </div>
                    {/* Add more feature items here */}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Record Expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Effortlessly record your expenses with our intuitive interface. Categorize and track your spending with ease.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Features;
