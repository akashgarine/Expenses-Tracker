import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import expenseFormImage from './image4.jpeg'; // Importing an example image
import './RecordEntry.css'; // Importing CSS file for styling

const RecordEntryForm = () => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }

            const newEntry = { userId, type, date, description, amount: amount.toString() };
            const response = await axios.post('http://localhost:3001/recordexpense', newEntry);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error adding expense:', error);
            setMessage('Failed to add record.');
        }

        setLoading(false);
        setType('');
        setDate('');
        setDescription('');
        setAmount('');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h2 className="text-center">Add New Expense</h2>
                            </div>
                            <div className="card-body">
                                {message && <p className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="type">Type:</label>
                                        <select className="form-control" id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value="">Select...</option>
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date:</label>
                                        <input className="form-control" id="date" name="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input className="form-control" id="description" name="description" type="text" required value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">₹</span>
                                            </div>
                                            <input className="form-control" id="amount" name="amount" type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn mt-2 btn-primary btn-block" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Expense'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <img src={expenseFormImage} className="img-fluid" alt="Expense Form" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordEntryForm;
