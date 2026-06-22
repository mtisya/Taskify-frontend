import api from "./api";

export const createTask = async (task: {
  title: string;
  description?: string;
  dueDate?: string;
}) => {
  const res = await api.post("/api/tasks", task);
  return res.data;
};

export const getTasks = async () => {
  const res = await api.get("/api/tasks");
  return res.data;
};

export const getTaskById = async (id: string) => {
  const res = await api.get(`/api/tasks/${id}`);
  return res.data;
};

export const updateTask = async (id: string, updates: any) => {
  const res = await api.put(`/api/tasks/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
};
