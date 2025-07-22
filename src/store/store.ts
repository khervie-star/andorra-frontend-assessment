import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ITask, TTaskPriority, TTaskStatus } from '../types';

interface TaskState {
  tasks: ITask[];
  addTask: (task: Omit<ITask, "id" | "createdAt" | "status">) => void;
  deleteTask: (id: string) => void;
  editTask: (task: ITask) => void;
  toggleComplete: (id: string) => void;
  filterTasks: (status?: TTaskStatus, priority?: TTaskPriority) => ITask[];
  clearAll: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => {
        const newTask: ITask = {
          ...task,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          status: "pending",
        };
        set({ tasks: [newTask, ...get().tasks] });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
      },

      editTask: (updatedTask) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        });
      },

      toggleComplete: (id) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === "completed" ? "pending" : "completed",
                }
              : task
          ),
        });
      },

      filterTasks: (status, priority) => {
        return get().tasks.filter((task) => {
          const matchStatus = status ? task.status === status : true;
          const matchPriority = priority ? task.priority === priority : true;
          return matchStatus && matchPriority;
        });
      },

      clearAll: () => {
        set({ tasks: [] });
      },
    }),
    {
      name: "task-store", // localStorage key
    }
  )
);
