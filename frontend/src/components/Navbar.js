import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import Profile from './Profile'; // Import the Profile component

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the profile modal

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  const handleProfileClick = () => {
    setShowProfile(true); // Show the profile modal when the Profile link is clicked
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // Close the profile modal
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand text-primary fs-3 fw-bold mx-auto">Expenses Tracker</p>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${showLinks ? 'show' : ''} collapse navbar-collapse justify-content-center`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recordexpense">Record Expense</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/expenses">Expenses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/expensesgraph">Graph</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">SignOut</Link>
              </li>
              <li className="nav-item">
                {/* Replace Link with a button that toggles the profile modal */}
                <Button variant="link" className="nav-link" onClick={handleProfileClick}>Profile</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile modal */}
      
      <Modal show={showProfile} onHide={handleCloseProfile} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Profile /> {/* Render the Profile component inside the modal */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar;
