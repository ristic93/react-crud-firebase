import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./header.scss";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/employees") {
      setActiveTab("Employees");
    } else if (location.pathname === "/tasks") {
      setActiveTab("Tasks");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">Employees App</p>
      <div className="header-right">
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
      </div>
      <p className="user">Hello: {currentUser.email}</p>
    </div>
  );
};

export default Header;
