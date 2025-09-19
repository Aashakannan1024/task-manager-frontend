import React, { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import api from "../service/api";
import { postTasks } from "../service/apiUrls";
import "../App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from backend
  const fetchTasks = async (): Promise<void> => {
    try {
      const res = await api.get(postTasks);
      setTasks(res.data?.data); // handle either {data:[]} or []
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  // Update task
  const updateTask = async (task: Task): Promise<void> => {
    try {
      const res = await api.put(`${postTasks}/${task._id}`, task);
    //   setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
    fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id: string): Promise<void> => {
    try {
      await api.delete(`${postTasks}/${id}`);
    //   setTasks(tasks.filter((t) => t._id !== id));
    fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList
        tasks={tasks}
        onTaskUpdated={updateTask}
        onTaskDeleted={deleteTask}
      />
    </div>
  );
};

export default App;
