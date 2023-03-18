import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./header.scss";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const location = useLocation();

  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/employees") {
      setActiveTab("Employees");
    } else if (location.pathname === "/tasks") {
      setActiveTab("Tasks");
    } else if (location.pathname === "/topemployees")
      setActiveTab("TopEmployees");
  }, [location]);

  return (
    <div className="header">
      <p className="logo">Employees App</p>
      <div className="header-center">
        <Link to="/employees">
          <p
            className={`${activeTab === "Employees" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Employees
          </p>
        </Link>
        <Link to="/tasks">
          <p
            className={`${activeTab === "Tasks" ? "active" : ""}`}
            onClick={() => setActiveTab("Tasks")}
          >
            Tasks
          </p>
        </Link>
        <Link to="/topemployees">
          <p
            className={`${activeTab === "TopEmployees" ? "active" : ""}`}
            onClick={() => setActiveTab("TopEmployees")}
          >
            Top employees
          </p>
        </Link>
      </div>
      <div className="header-left">
        <p className="user">
          <span>Hello:</span> {currentUser.email}
        </p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
