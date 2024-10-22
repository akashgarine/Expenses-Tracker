import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login"
import RecordExpense from "./components/RecordExpense";
import Home from "./components/Home";
import ExpensesList from "./components/ExpensesList";
import ExpensesGraph from "./components/ExpensesGraph";
import Profile from "./components/Profile";
import LandingPage from"./components/LandingPage";
import ContactUs from "./components/ContactUs";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/usersignup" element={<Signup />} />
          <Route path="/recordexpense" element={<RecordExpense />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expenses" element={<ExpensesList />} />
          <Route path="/expensesgraph" element={<ExpensesGraph />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
