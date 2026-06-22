import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  getTaskById as apiGetTaskById,
} from "../services/tasks";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => Promise<Task | null>;
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  getTask: async () => null,
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [accessToken]);

  const fetchTasks = async () => {
    try {
      const data = await apiGetTasks();
      setTasks(data);
    } catch (err: any) {
      console.error("❌ Failed to fetch tasks:", err.userFriendlyMessage || err.message);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const newTask = await apiCreateTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err: any) {
      console.error("❌ Failed to create task:", err.userFriendlyMessage || err.message);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updated = await apiUpdateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      console.error("❌ Failed to update task:", err.userFriendlyMessage || err.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error("❌ Failed to delete task:", err.userFriendlyMessage || err.message);
    }
  };

  const getTask = async (id: string) => {
    try {
      return await apiGetTaskById(id);
    } catch (err: any) {
      console.error("❌ Failed to fetch task:", err.userFriendlyMessage || err.message);
      return null;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};
