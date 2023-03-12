import React, { useState, useContext } from "react";
import "./tasks.scss";
import { db } from "../firebase/firebase.config";
import { addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Input, Select } from "../common";
import TasksContext from "../context/TasksContext";
import EmployeesContext from "../context/EmployeesContext";

const initialState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  status: "",
};

const Tasks = () => {
  const [state, setState] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const { task, setTask, tasksCollection } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  const { title, description, assignee, dueDate, status } = state;

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
      setTask(task.filter((task) => task.id !== id));
      toast.success("Task has been deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
          <label htmlFor="salary">Status:</label>
          <Select
            name="assignee"
            id="assignee"
            onChange={handleInputChange}
            required
          >
            <option selected={true} disabled>
              Please select...
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
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
          >
            <option selected={true} disabled>
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

      {task.length === 0 ? (
        <h2>No tasks added yet</h2>
      ) : (
        <article className="data-wrapper">
          <h2>Tasks info</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Assignee</th>
                <th scope="col">Due date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task, idx) => (
                <tr key={task.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignee}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <Button
                      className="mx-2"
                      size="sm"
                      color="success"
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
  );
};

export default Tasks;