import React, { useState, useContext } from "react";
import "./tasks.scss";
import { db } from "../firebase/firebase.config";
import { addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Input, Select } from "../components/common";
import TasksContext from "../context/TasksContext";
import EmployeesContext from "../context/EmployeesContext";
import { Header, Footer } from "../components";

const initialState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: ""
};

const Tasks = () => {
  const [state, setState] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState(null);
  const { tasks, setTasks, tasksCollection } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  const { title, description, assignee, dueDate } = state;

  const filterOptions = [
    { label: "All", value: null },
    { label: "Completed", value: "completed" },
    { label: "Todo", value: "todo" },
  ];

  const currentTasks = tasks.filter((task) =>
    filter ? task.status === filter : true
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !assignee || !dueDate) {
      toast.error("Please provide value in each input field");
    } else {
      if (!isEdit) {
        // Add new task
        addDoc(tasksCollection, state)
          .then(() => {
            toast.success("Task added successfully");
            setState(initialState);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to add task");
          });
      } else {
        // Update existing task
        updateDoc(doc(db, "tasks", editId), state)
          .then(() => {
            toast.success("Task updated successfully");
            setIsEdit(false);
            setEditId(null);
            setState(initialState);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update task");
          });
      }
    }
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    setEditId(task.id);
    setState(task);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditId("");
    setState(initialState);
  };

  // Delete the specified task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task has been deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <section className="task container">
        <article className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>{isEdit ? "Edit Task" : "Add Task"}</h2>
            <Input
              label="Title:"
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={handleInputChange}
            />
            <Input
              label="Description:"
              type="text"
              id="description"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={handleInputChange}
            />
            <label htmlFor="salary">Assignee:</label>
            <Select
              name="assignee"
              id="assignee"
              onChange={handleInputChange}
              required
              defaultValue=""
            >
              <option value="" selected={true} disabled>
                Please select...
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </Select>
            <Input
              label="Due date:"
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={handleInputChange}
            />
            <label htmlFor="salary">Status:</label>
            <Select
              name="status"
              id="status"
              required
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" selected={true} disabled>
                Please select...
              </option>
              <option value="todo">Todo</option>
              <option value="completed">Completed</option>
            </Select>
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

        {tasks.length === 0 ? (
          <h2>No tasks added yet</h2>
        ) : (
          <article className="data-wrapper">
            <div className="heading-wrapper">
              <h2>Tasks info</h2>
              <div className="filter-option">
                {filterOptions.map((option, idx) => (
                  <span
                    key={idx}
                    onClick={() => setFilter(option.value)}
                    className={filter === option.value ? "active" : ""}
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Assignee</th>
                  <th>Due date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, idx) => (
                  <tr key={task.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      {employees.find(
                        (employee) => employee.id === task.assignee
                      )?.name ?? "DELETED"}
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      <span
                        className={`${
                          task.status === "completed" ? "completed" : "todo"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        className="mx-2"
                        size="sm"
                        color="warning"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => deleteTask(task.id)}
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

export default Tasks;
