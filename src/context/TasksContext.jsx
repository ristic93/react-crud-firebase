import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [task, setTask] = useState([]);

  const tasksCollection = collection(db, "tasks");

  // Get all tasks LISTEN (realtime)
  useEffect(() => {
    try {
      const fetchTasks = onSnapshot(tasksCollection, (snapShot) => {
        const taskData = snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTask(taskData);
      });
      return () => {
        fetchTasks();
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <TasksContext.Provider value={{ task, setTask, tasksCollection }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
