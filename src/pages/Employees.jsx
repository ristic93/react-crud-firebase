import React, { useState, useEffect } from "react";
import "./employees.scss";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

const initialState = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  salary: ""
};

const Employees = () => {
  const [state, setState] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { name, email, phone, birthDate, salary } = state;

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
      if (!isEdit) {
        // Add new employee
        addDoc(employeesCollection, state)
          .then(() => {
            toast.success("Employee added successfully");
            setState(initialState);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to add employee");
          });
      } else {
        // Update existing employee
        updateDoc(doc(db, "employees", editId), state)
          .then(() => {
            toast.success("Employee updated successfully");
            setIsEdit(false);
            setEditId(null);
            setState(initialState);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update employee");
          });
      }
    }
  };

  const handleEdit = (employee) => {
    setIsEdit(true);
    setEditId(employee.id);
    setState(employee);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditId("");
    setState(initialState);
  };

  // Get all employees
  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        const data = await getDocs(employeesCollection);
        const employeeData = data.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setEmployees(employeeData);
      };
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Delete the specified employee
  const deleteEmployee = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
      setEmployees(employees.filter((employee) => employee.id !== id));
      toast.success("Employee has been deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="employee container">
      <article className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>{isEdit ? "Edit Employee" : "Add Employee"}</h2>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Employee name here"
            value={name}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Employee Email"
            value={email}
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Phone Number :</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Employee phone number"
            value={phone}
            onChange={handleInputChange}
          />
          <label htmlFor="birthDate">Date of Birth:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={handleInputChange}
          />
          <label htmlFor="salary">Monthly Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Employee Salary"
            value={salary}
            onChange={handleInputChange}
          />
          <input type="submit" value={isEdit ? "Update" : "Save"} />
          {isEdit && (
            <Button color="danger" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </form>
      </article>

      {employees.length === 0 ? (
        <h2>No employees added yet</h2>
      ) : (
        <article className="data-wrapper">
          <h2>Employees info</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Date of birth</th>
                <th scope="col">Monthly salary</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, idx) => (
                <tr key={employee.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.birthDate}</td>
                  <td>$ {employee.salary}</td>
                  <td>
                    <Button
                      className="mx-2"
                      size="sm"
                      color="success"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      )}
    </section>
  );
};

export default Employees;
