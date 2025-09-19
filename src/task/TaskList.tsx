import React from "react";
import type { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks && tasks?.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <span
                className={`status ${
                  task.completed  ? "completed" : "pending"
                }`}
              >
                {task.completed}
              </span>
            </td>
            <td className="actions">
             {!task.completed ? (
                <button
                  className="complete"
                  onClick={() =>
                    onTaskUpdated({ ...task, completed: true })
                  }
                >
                  Mark Completed
                </button>
              ) : <p>Compeleted</p>}
              <button className="delete" onClick={() => onTaskDeleted(task._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
