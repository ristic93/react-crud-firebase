import React, { useState, useEffect } from "react";
import "./tasks.scss";
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
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  status: "",
};

const Tasks = () => {
  const [state, setState] = useState(initialState);
  const [task, setTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { title, description, assignee, dueDate, status } = state;

  const tasksCollection = collection(db, "tasks");

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

  // Get all tasks
  useEffect(() => {
    try {
      const fetchTasks = async () => {
        const data = await getDocs(tasksCollection);
        const taskData = data.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTask(taskData);
      };
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Assignee:</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            placeholder="Assignee name here"
            value={assignee}
            onChange={handleInputChange}
          />
          <label htmlFor="birthDate">Due date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={handleInputChange}
          />
          <label htmlFor="salary">Status:</label>
          <select name="status" id="status">
            <option value="completed">Completed</option>
            <option value="todo">Pending</option>
          </select>
          <input type="submit" value={isEdit ? "Update" : "Save"} />
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
