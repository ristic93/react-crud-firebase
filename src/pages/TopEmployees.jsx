import React, { useContext } from "react";
import { Footer, Header } from "../components";
import EmployeesContext from "../context/EmployeesContext";
import TasksContext from "../context/TasksContext";
import "./topEmployees.scss";

const TopEmployees = () => {
  const { tasks } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  const taskByEmployee = employees.reduce((acc, employee) => {
    const taskCount = tasks.filter(
      (task) => task.assignee === employee.id && task.status === "completed"
    ).length;
    return { ...acc, [employee.id]: taskCount };
  }, {});

  const sortedEmployees = employees
    .filter((employee) => taskByEmployee[employee.id] > 0)
    .sort((a, b) => taskByEmployee[b.id] - taskByEmployee[a.id]);

  return (
    <>
      <Header />
      <h2 className="topEmployees">Top Employees</h2>
      {sortedEmployees.length === 0 ? (
        <div className="no-employee">
          <h2>No employee has done the tasks yet</h2>
        </div>
      ) : (
        <div className="table-wrapper container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Tasks Completed</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.slice(0, 5).map((employee, idx) => (
                <tr key={employee.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{employee.name}</td>
                  <td>{taskByEmployee[employee.id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Footer />
    </>
  );
};

export default TopEmployees;
