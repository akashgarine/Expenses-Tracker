import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
function Nav() {
  const [showLinks, setShowLinks] = useState(false);

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  return (
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
              <Link className="nav-link" to="/userlogin">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usersignup">SignUp</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
