import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./home.scss";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const employeeCollection = collection(db, "employees");

  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        const data = await getDocs(employeeCollection);
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
      console.log(err);
    }
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
      setEmployees(employees.filter((employee) => employee.id !== id));
      toast.success("Employee has been deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(employees);
  return (
    <div className="employees-table container">
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
                <Button className="mx-2" size="sm" color="success">
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
    </div>
  );
};

export default Home;
