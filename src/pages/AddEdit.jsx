import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addEdit.scss";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  salary: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, phone, birthDate, salary } = state;
  const navigate = useNavigate();

  const employeesCollection = collection(db, "employees");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !birthDate || !salary) {
      toast.error("Please provide value in each input field");
    } else {
      addDoc(employeesCollection, state)
        .then(() => {
          toast.success("Employee added successfully");
          setState(initialState);

          navigate("/");
        })
        .catch((err) => {
          console.log("Error adding document: ", err);
          toast.error("Failed to add employee");
        });
    }
  };

  return (
    <div className="add-edit container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Employee Name..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Employee Email..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Employee Phone..."
          value={phone}
          onChange={handleInputChange}
        />
        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          placeholder="Employee Birth Date..."
          value={birthDate}
          onChange={handleInputChange}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          placeholder="Employee Salary..."
          value={salary}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEdit;
