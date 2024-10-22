


const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'], // Ensure type is either 'income' or 'expense'
        required: true
    },
    date: {
        type: Date, // Use Date type for date fields
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number, // Use Number type for amount fields
        required: true
    }
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    expenses: [expenseSchema] // Embedding the expense schema as a subdocument array
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

