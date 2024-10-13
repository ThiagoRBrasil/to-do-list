import { INewTask, ITask } from "@/util/interfaces/Task.interface";

export const getTasks = async () => {
  console.log("getTasks");
  const tasks = await fetch("/tasks");
  return tasks.json();
};

export const addTask = async (task: INewTask) => {
  return await fetch("/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const updateTask = async (task: ITask) => {
  return await fetch(`/tasks/${task.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const updateStatusTask = async (taskId: string) => {
  return await fetch(`/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const deleteTask = async (taskId: string) => {
  return await fetch(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
