import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Import CSS file for custom styling

function Profile() {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user profile data from backend when component mounts
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const userId = sessionStorage.getItem('userId');
            console.log('UserID from sessionStorage:', userId);
            if (!userId) {
                throw new Error('User ID not found in sessionStorage');
            }
            const response = await fetch(`http://localhost:3001/profile/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const userData = await response.json();
            console.log('User profile data:', userData);
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Handle error, show error message, etc.
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="profile-container">
            <Button variant="primary" onClick={handleShow}>
                View Profile
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user ? (
                        <>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </>
                    ) : (
                        <p>Loading user profile...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;
