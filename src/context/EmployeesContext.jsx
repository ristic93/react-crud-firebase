import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const employeesCollection = collection(db, "employees");

  // Get all employees
  useEffect(() => {
    try {
      const fetchEmployees = onSnapshot(employeesCollection, (snapShot) => {
        const employeeData = snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setEmployees(employeeData);
      });

      return () => {
        fetchEmployees();
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <EmployeesContext.Provider
      value={{ employeesCollection, employees, setEmployees }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
