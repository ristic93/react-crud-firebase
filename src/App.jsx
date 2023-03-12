import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Employees, Tasks } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

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
      </Routes>
    </div>
  );
}

export default App;
