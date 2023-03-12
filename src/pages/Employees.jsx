import React, { useState, useContext } from "react";
import "./employees.scss";
import { db } from "../firebase/firebase.config";
import { addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Input } from "../components/common";
import EmployeesContext from "../context/EmployeesContext";
import { Header, Footer } from "../components";

const initialState = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  salary: "",
};

const Employees = () => {
  const [state, setState] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const { employees, setEmployees, employeesCollection } =
    useContext(EmployeesContext);

  const { name, email, phone, birthDate, salary } = state;

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
    <>
      <Header />
      <section className="employee container">
        <article className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{isEdit ? "Edit Employee" : "Add Employee"}</h2>
            <Input
              label="Full Name:"
              type="text"
              id="name"
              name="name"
              placeholder="Employee name here"
              value={name}
              onChange={handleInputChange}
            />
            <Input
              label="Email:"
              type="email"
              id="email"
              name="email"
              placeholder="Employee Email"
              value={email}
              onChange={handleInputChange}
            />
            <Input
              label="Phone Number:"
              type="number"
              id="phone"
              name="phone"
              placeholder="Employee phone number"
              value={phone}
              onChange={handleInputChange}
            />
            <Input
              label="Date of Birth:"
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={handleInputChange}
            />
            <Input
              label="Monthly Salary:"
              type="number"
              id="salary"
              name="salary"
              placeholder="Employee Salary"
              value={salary}
              onChange={handleInputChange}
            />
            <Button type="submit" color="success">
              {isEdit ? "Update" : "Save"}
            </Button>
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
            <div className="heading-wrapper">
              <h2>Employees info</h2>
              <Input
                type="text"
                className="search"
                placeholder="Search Employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Date of birth</th>
                  <th>Monthly salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((emp) =>
                    emp.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((employee, idx) => (
                    <tr key={idx}>
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
      <Footer />
    </>
  );
};

export default Employees;
