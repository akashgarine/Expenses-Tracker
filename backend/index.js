
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require('bcrypt');
const UserModel = require("./models/User");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect('mongodb://127.0.0.1:27017/rtfp');

//signup
app.post("/usersignup", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        UserModel.create({ username, email, password: hash })
            .then(() => res.send('success')) // Send success message
            .catch(err => console.log(err));
    }).catch(err => {
        console.log("error", err);
    });
});

// For user login
app.post('/userlogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(200).send(user._id);
            } else {
                res.status(401).json({ message: 'Incorrect password.' });
            }
        } else {
            res.status(401).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


app.post('/recordexpense', async (req, res) => {
    console.log(req.body)
    const { userId, type, date, description, amount } = req.body;
    const newExpense = { type, date, description, amount }
    console.log(newExpense)
    try {

        UserModel.findOne({ _id: userId })
            .then(user => {
                if (user) {
                    user.expenses.push({ type, date, description, amount });
                    return user.save(); // Make sure to return the save operation to handle it asynchronously
                } else {
                    return Promise.reject({ message: 'User not found' }); // Reject the promise if user is not found
                }
            })
            .then(() => {
                res.status(200).json({ message: 'Expense recorded successfully' });
            })
            .catch(err => {
                console.error('Error recording expense:', err);
                res.status(404).json({ message: err.message || 'User not found' });
            });


        // Send success response
    } catch (error) {
        console.error('Error recording expense:', error);
        res.status(500).json({ message: 'Failed to record expense' });
    }
});


app.get('/expenses', async (req, res) => {
    const { userId, type, month, year } = req.query;
    console.log('Received request with parameters:', { userId, type, month, year }); // Debugging statement
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let filteredExpenses = user.expenses;

        // Filter by type
        if (type) {
            filteredExpenses = filteredExpenses.filter(expense => expense.type === type);
        }

        // Filter by month and year
        if (month && year) {
            const filteredMonth = parseInt(month, 10); // Convert to integer
            const filteredYear = parseInt(year, 10); // Convert to integer
            console.log('Filtering by month and year:', { month: filteredMonth, year: filteredYear }); // Debugging statement
            filteredExpenses = filteredExpenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() + 1 === filteredMonth && expenseDate.getFullYear() === filteredYear;
            });
        } else if (year) {
            // Filter by year only
            const filteredYear = parseInt(year, 10); // Convert to integer
            console.log('Filtering by year:', filteredYear); // Debugging statement
            filteredExpenses = filteredExpenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getFullYear() === filteredYear;
            });
        }

        res.json(filteredExpenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
});

// Update expense
app.put('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, description, type, date } = req.body;
    try {
        const expense = await UserModel.findByIdAndUpdate(id, { amount, description, type, date }, { new: true });
        res.json(expense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Failed to update expense' });
    }
});

// Delete expense
app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Failed to delete expense' });
    }
});

// Fetch user profile route
app.get('/profile/:userId', async (req, res) => {
    const userId=req.params.userId;
    console.log(userId)
    try {
        const user = await UserModel.findById(userId).select('-password');
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
});



// Logout route
app.post('/logout', (req, res) => {
    // Implement your logout logic here, like clearing session data
    res.status(200).json({ message: 'Logged out successfully' });
});


app.listen(3001, () => {
    console.log('Server is running at port 3001');
});

