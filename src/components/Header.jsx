import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddEmployee");
    }
  }, [location]);
  
  return (
    <div className="header">
      <p className="logo">CRUD App</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddEmployee" ? "active" : ""}`}
            onClick={() => setActiveTab("AddEmployee")}
          >
            Add Employee
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
