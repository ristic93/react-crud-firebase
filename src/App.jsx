import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Employees, Tasks, Login, Register, TopEmployees } from "./pages";
import { ToastContainer } from "react-toastify";
import AuthContext from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <RequiredAuth>
              <Employees />
            </RequiredAuth>
          }
        />
        <Route
          path="/tasks"
          element={
            <RequiredAuth>
              <Tasks />
            </RequiredAuth>
          }
        />
        <Route
          path="/topemployees"
          element={
            <RequiredAuth>
              <TopEmployees />
            </RequiredAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
