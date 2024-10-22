 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import expensesListImage from './image5.jpeg'; // Importing an example image
import './expense.css';
import * as XLSX from 'xlsx';
const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [editMode, setEditMode] = useState({ id: null, field: null });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in sessionStorage');
                }

                // Constructing the URL with filter parameters
                let url = `http://localhost:3001/expenses?userId=${userId}`;
                if (filterType) {
                    url += `&type=${filterType}`;
                }
                if (filterMonth && filterYear) {
                    url += `&month=${filterMonth}&year=${filterYear}`;
                }

                const response = await axios.get(url);
                setExpenses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [filterType, filterMonth, filterYear]); // Trigger effect when filter options change

    // Function to handle updating an expense
    const handleUpdate = (expense) => {
        setEditMode({ id: expense._id, field: 'all' });
    };

    // Function to handle input change for editing expense details
    const handleInputChange = (event, id) => {
        const updatedExpenses = expenses.map((expense) =>
            expense._id === id ? { ...expense, [event.target.name]: event.target.value } : expense
        );
        setExpenses(updatedExpenses);
    };

    // Function to handle saving the edited expense
    const handleSave = async (id) => {
        try {
            const expenseToUpdate = expenses.find((expense) => expense._id === id);
            await axios.put(`http://localhost:3001/expenses/${id}`, expenseToUpdate);
            setEditMode({ id: null, field: null });
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    // Function to handle deleting an expense
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/expenses/${id}`);
            const updatedExpenses = expenses.filter((expense) => expense._id !== id);
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
// function to download in excel format
    const handleDownload = () => {
        // Exclude the _id field from each expense object
        const expensesWithoutId = expenses.map(({ _id, ...rest }) => rest);
        
        const worksheet = XLSX.utils.json_to_sheet(expensesWithoutId);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        XLSX.writeFile(workbook, 'expenses.xlsx');
    };
    

    // Calculate total income and expenses for the selected month
    const totalIncome = expenses
        .filter((expense) => expense.type === 'income' && (!filterMonth || !filterYear || expense.date.includes(`${filterYear}-${filterMonth}`)))
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const totalExpenses = expenses
        .filter((expense) => expense.type === 'expense' && (!filterMonth || !filterYear || expense.date.includes(`${filterYear}-${filterMonth}`)))
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    // Function to generate options for years
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= currentYear - 10; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="dashboard-container">
                            <h2 className="mb-4">Expenses</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    <div className="filter-section mb-3">
                                        {/* Filter options */}
                                        <div className="row">
                                            <div className="col-md-4">
                                                <select className="form-control" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                                    <option value="">All Types</option>
                                                    <option value="income">Income</option>
                                                    <option value="expense">Expense</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-control" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                                                    <option value="">All Months</option>
                                                    <option value="01">January</option>
                                                    <option value="02">February</option>
                                                    <option value="03">March</option>
                                                    <option value="04">April</option>
                                                    <option value="05">May</option>
                                                    <option value="06">June</option>
                                                    <option value="07">July</option>
                                                    <option value="08">August</option>
                                                    <option value="09">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-control" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                                                    <option value="">All Years</option>
                                                    {/* Add options for years */}
                                                    {generateYearOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="total-section mb-3">
                                            <strong>Total Income:</strong> ₹ {totalIncome.toFixed(2)} | <strong>Total Expenses:</strong> ₹ {totalExpenses.toFixed(2)}
                                            <strong>Total Savings:</strong> ₹ {(totalIncome - totalExpenses).toFixed(2)}
                                    </div>
                                    <div className="table-container">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th >Amount</th>
                                                    <th>Description</th>
                                                    <th>Type</th>
                                                    <th>Date</th>
                                                    <th>Actions</th> {/* Add Actions column */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {expenses.map((expense, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {editMode.id === expense._id && editMode.field === 'all' ? (
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="amount"
                                                                    value={expense.amount}
                                                                    onChange={(e) => handleInputChange(e, expense._id)}
                                                                />
                                                            ) : (
                                                                expense.amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editMode.id === expense._id && editMode.field === 'all' ? (
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="description"
                                                                    value={expense.description}
                                                                    onChange={(e) => handleInputChange(e, expense._id)}
                                                                />
                                                            ) : (
                                                                expense.description
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editMode.id === expense._id && editMode.field === 'all' ? (
                                                                <select
                                                                    className="form-control"
                                                                    name="type"
                                                                    value={expense.type}
                                                                    onChange={(e) => handleInputChange(e, expense._id)}
                                                                >
                                                                    <option value="income">Income</option>
                                                                    <option value="expense">Expense</option>
                                                                </select>
                                                            ) : (
                                                                expense.type
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editMode.id === expense._id && editMode.field === 'all' ? (
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    name="date"
                                                                    value={expense.date}
                                                                    onChange={(e) => handleInputChange(e, expense._id)}
                                                                />
                                                            ) : (
                                                                new Date(expense.date).toLocaleDateString()
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editMode.id === expense._id ? (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-success me-2"
                                                                        onClick={() => handleSave(expense._id)}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-secondary"
                                                                        onClick={() => setEditMode({ id: null, field: null })}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-primary me-2"
                                                                        onClick={() => handleUpdate(expense)}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleDelete(expense._id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn-outline-success mt-3" onClick={handleDownload}>
                                    Download as Excel
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* Example image */}
                        <img src={expensesListImage} className="img-fluid" alt="Expenses List" />
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default ExpensesList;
