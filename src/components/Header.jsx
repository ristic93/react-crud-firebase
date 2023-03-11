import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Employees");
    } else if (location.pathname === "/tasks") {
      setActiveTab("Tasks");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">CRUD App</p>
      <div className="header-right">
        <Link to="/">
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
      </div>
    </div>
  );
};

export default Header;
