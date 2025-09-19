import React, { useState } from "react";
import type { Task } from "../types/Task";
import api from "../service/api";
import { postTasks } from "../service/apiUrls";

interface TaskFormProps {
  fetchTasks: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return alert("Title is required");
    try {
      const res = await api.post(postTasks, {
        title,
        description,
      });
      fetchTasks();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
